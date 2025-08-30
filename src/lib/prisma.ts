//just want a singleton class of the prisma will allows us to run direct queries

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['warn', 'error'], 
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
