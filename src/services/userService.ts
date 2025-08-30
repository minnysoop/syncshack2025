import { prisma } from '../lib/prisma';

type Role = 'LESSOR' | 'RENTER';

export async function createUser(params: {
  name: string;
  email: string;
  role: Role;      // must match our Prisma enum
}) {
  const { name, email, role } = params;

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        role, // 'LESSOR' | 'RENTER'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    return user;
  } catch (err: any) {

    if (err?.code === 'P2002' && err?.meta?.target?.includes('email')) {
      throw new Error('Email already exists');
    }
    throw err;
  }
}

/** (Nice to have) List users for quick debugging */
export async function listUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
}




//role by their email
export async function getUserRoleByEmail(email: string) {
  const normalized = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalized },
    select: { id: true, email: true, role: true },
  });

  if (!user) throw new Error('User not found');
  return user; 
}
