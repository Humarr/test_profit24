// lib/bots.ts
// import prisma from '@/lib/prisma'
import { ENDPOINT_URL } from '../../endpoint'
import { cookies } from 'next/headers'

export async function getAllBots() {
  // return await prisma.bot.findMany({
  //   orderBy: {
  //     createdAt: 'desc',
  //   },
  // })
  return await fetch(`${ENDPOINT_URL}/api/admin/bots`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${
        (await cookies()).get('auth_token')?.value}`,
    },
    // cache: 'no-store', // ensure it's always fresh
    credentials: 'include'
  }).then(res => res.json())
}
