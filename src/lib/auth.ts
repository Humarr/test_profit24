
import jwt from 'jsonwebtoken';

export interface AuthPayload {
  id: string;
  email: string;
  name?: string;
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
  } catch {
    return null;
  }
}


// import { cookies } from 'next/headers';
// import jwt from 'jsonwebtoken';

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
