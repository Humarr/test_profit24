import { cookies } from 'next/headers';
import { verifyToken } from './auth';
import { prisma } from './prisma';

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) return null;

  const payload = verifyToken(token);

  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      phone: true,
      
    },
  });

  return user;
}
