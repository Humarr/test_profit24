
// /src/lib/auth.ts
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import prisma from './prisma';
import { compare } from 'bcryptjs';
// import { ENDPOINT_URL } from '../../endpoint';
const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthPayload {
  id: string;
  email: string;
  name?: string;
  role?: string; // optional: useful if you support roles
}

/**
 * Verify a JWT token and return the payload
 */
export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch {
    return null;
  }
}

/**
 * Get the authenticated user from cookie-based auth_token
 */
// export async function getAuthUser() {
//   const token = (await cookies()).get('auth_token')?.value;

//   if (!token) return null;

//   try {
//     const res = await fetch(`${ENDPOINT_URL}/api/user/me`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//       credentials: 'include',
//     });
//     const user = await res.json();
//     return user;
//   } catch (error) {
//     console.error("Auth token verification failed:", error);
//     return null;
//   }
// }
export async function getAuthUser() {
  const token = (await cookies()).get('auth_token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    return user;
  } catch (error) {
    console.error("Auth token verification failed:", error);
    return null;
  }
}

/**
 * Get admin user (checks role)
 */
// export async function getAdminUser() {
//   const token = (await cookies()).get('admin_token')?.value;

//   if (!token) return null;

//   try {
//  const res = await fetch(`${ENDPOINT_URL}/api/admin/users/me`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//       credentials: 'include',
//     });
//     const user = await res.json();
//     return user;
//   } catch (error) {
//     console.error("Admin token verification failed:", error);
//     return null;
//   }
// }
export async function getAdminUser() {
  const token = (await cookies()).get('admin_token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user || user.role !== 'admin') return null;

    return user;
  } catch (error) {
    console.error("Admin token verification failed:", error);
    return null;
  }
}







import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error('No user found');

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error('Invalid password');

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        if (!session.user) {
          session.user = {
            id: token.id as string,
            email: token.email,
            name: token.name,
          };
        }
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};













// export async function getCurrentUser() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get('token')?.value;

//   if (!token) return null;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     return decoded; // contains userId, email, etc.
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// }
