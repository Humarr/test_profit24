// app/api/admin/users/route.ts
import { prisma } from '@/lib/prisma'
import { getAdminUser } from '@/lib/auth'
import { NextResponse } from 'next/server'

// export async function GET() {
//   const admin = await getAdminUser()
//   if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

//   const users = await prisma.user.findMany({
//     orderBy: { createdAt: 'desc' },
//     include: { subscriptions: true },
//   })

//   return NextResponse.json({ users })
// }



export async function GET() {
    const admin = await getAdminUser()
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      subscriptions: true,
    },
  });
  return NextResponse.json({ users });
}

