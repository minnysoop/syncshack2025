import { prisma } from '../lib/prisma';

export async function createHubForOwner(params: {
  ownerId: string;
  name: string;
  lat: number;
  lng: number;
}) {
  const { ownerId, name, lat, lng } = params;

  const owner = await prisma.user.findUnique({
    where: { id: ownerId },
    select: { id: true, role: true },
  });
  if (!owner) throw new Error('Owner not found');
  if (owner.role !== 'LESSOR') throw new Error('Only LESSOR users can own hubs');

  const existing = await prisma.hub.findFirst({
    where: { ownerId, lat, lng },
    select: { id: true },
  });
  if (existing) throw new Error('Hub already exists at these coordinates for this owner');

  return prisma.hub.create({
    data: { name, lat, lng, ownerId },
  });
}

export async function getHubCoords(hubId: string) {
  const hub = await prisma.hub.findUnique({
    where: { id: hubId },
    select: { lat: true, lng: true },
  });
  if (!hub) throw new Error('Hub not found');
  return hub; // { lat: number, lng: number }
}
