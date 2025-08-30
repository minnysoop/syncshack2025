import { prisma } from '../lib/prisma';

type Role = 'LESSOR' | 'RENTER';

export async function createDeliveryByRenter(params: {
  renterId: string;      // renter wants to deliver their own product
  productId: string;     // our guard to ensure the product being delivered must belong to renter
  originHubId: string;   // must match product's Inventory.hubId
  destLat: number;
  destLng: number;
  estimatedArrivalTime?: Date | null;
}) {
  const { renterId, productId, originHubId, destLat, destLng, estimatedArrivalTime } = params;

  return prisma.$transaction(async (tx) => {
    // 1) Renter exists and is RENTER
    const renter = await tx.user.findUnique({ where: { id: renterId }, select: { id: true, role: true } });
    if (!renter) throw new Error('Renter not found');
    if (renter.role !== 'RENTER') throw new Error('Only RENTER users can create deliveries');

    // 2) Product exists and belongs to renter
    const product = await tx.product.findUnique({
      where: { id: productId },
      select: { id: true, ownerId: true, delivery: { select: { id: true, status: true } } },
    });
    if (!product) throw new Error('Product not found');
    if (product.ownerId !== renterId) throw new Error('This product is not owned by the renter');

    // 3) It must not already have a delivery (your schema is 1:1)
    if (product.delivery) throw new Error('This product already has a delivery');

    // 4) Inventory must confirm product lives at originHubId
    const inv = await tx.inventory.findUnique({
      where: { hubId_productId: { hubId: originHubId, productId } },
      select: { hubId: true, productId: true },
    });
    if (!inv) throw new Error('Product is not at the specified origin hub');

    // 5) Create the Delivery (status defaults to PENDING)
    const delivery = await tx.delivery.create({
      data: {
        productId,
        originHubId,
        destLat,
        destLng,
        estimatedArrivalTime: estimatedArrivalTime ?? null,
        // status defaults to PENDING per schema
      },
      select: {
        id: true, productId: true, originHubId: true, destLat: true, destLng: true,
        status: true, estimatedArrivalTime: true, actualArrivalTime: true, createdAt: true,
      },
    });

    return delivery;
  });
}

export async function listPendingDeliveriesByHub(hubId: string) {
  return prisma.delivery.findMany({
    where: { originHubId: hubId, status: 'PENDING' },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, productId: true, destLat: true, destLng: true, status: true,
      estimatedArrivalTime: true, createdAt: true,
    },
  });
}
