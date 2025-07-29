import { cookies } from 'next/headers';
import { verifyToken } from './auth';
import { prisma } from './prisma';
// import { ENDPOINT_URL } from '../../endpoint';
// export async function getCurrentUser() {
//   console.log('Fetching user from:', `${ENDPOINT_URL}/api/user/me`);

//   const cookieStore = await cookies();
//   const token = cookieStore.get('auth_token')?.value;

//   if (!token) return null;



//   try {
//     const response = await fetch(`${ENDPOINT_URL}/api/user/me`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//       credentials: 'include',
//     });

//     console.log('Response status:', response.status);
//     console.log('Response headers:', response.headers);

//     if (!response.ok) {
//       console.error('Failed to fetch user:', response.status, response.statusText);
//       return null;
//     }

//     const user = await response.json();
//     console.log('User data:', user);
//     return user.user;
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     return null;
//   }
// }
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
      role: true,
      
    },
  });

  return user;
}
