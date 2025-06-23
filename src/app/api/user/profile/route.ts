// /src/app/api/user/profile/route.ts

import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        referralId: true,
        tradingAmount: true,
        experience: true,
        createdAt: true,
        role: true,
      },
    })

    if (!userData) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user: userData })
  } catch (err) {
    console.error('[GET /api/user/profile]', err)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}



export async function PATCH(req: Request) {
    try {
      const user = await getAuthUser()
  
      if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
      }
  
      const body = await req.json()
      const {
        name,
        phone,
        tradingAmount,
        experience,
        referralId,
        
        
      } = body
  
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          name,
          phone,
          tradingAmount,
          experience,
          referralId,
          
        },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          referralId: true,
          tradingAmount: true,
          experience: true,
          updatedAt: true,
          role: true,
        }
      })
  
      return NextResponse.json({ user: updatedUser })
    } catch (err) {
      console.error('[PATCH /api/user/profile]', err)
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
  }
  