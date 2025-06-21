import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const user = await getAuthUser()
    // https://profit24.com/register?ref=abcdef1234

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const referredUsers = await prisma.user.findMany({
      where: {
        referralId: user.myReferralCode
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    })

    return NextResponse.json({ count: referredUsers.length, users: referredUsers })
  } catch (err) {
    console.error('[GET /api/dashboard/referrals]', err)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
