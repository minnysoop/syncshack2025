import { prisma } from '../lib/prisma';

type Role = 'LESSOR' | 'RENTER';

export async function createProduct(params: {
  ownerId: string;      // must be a RENTER
  name: string;
  // optional: place into a hub immediately
  hubId?: string;       // if provided, we’ll create Inventory too
}) {
  const { ownerId, name, hubId } = params;

  // 1) verify owner exists and is a RENTER
  const owner = await prisma.user.findUnique({
    where: { id: ownerId },
    select: { id: true, role: true },
  });
  if (!owner) throw new Error('Owner not found');
  if (owner.role !== 'RENTER') throw new Error('Only RENTER users can own products');
//need to remember that we could pass hubId immeiately 
  if (hubId) {
    return prisma.$transaction(async (tx) => {
      const hub = await tx.hub.findUnique({ where: { id: hubId }, select: { id: true } });
      if (!hub) throw new Error('Hub not found');

      const product = await tx.product.create({
        data: { name, ownerId },
        select: { id: true, name: true, ownerId: true, createdAt: true, updatedAt: true },
      });

      await tx.inventory.create({
        data: { hubId, productId: product.id },
      });

      return product;
    });
  }

  
  return prisma.product.create({
    data: { name, ownerId },
    select: { id: true, name: true, ownerId: true, createdAt: true, updatedAt: true },
  });
}

export async function listProductsByOwner(ownerId: string) {
  return prisma.product.findMany({
    where: { ownerId },
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, ownerId: true, createdAt: true, updatedAt: true },
  });
}
