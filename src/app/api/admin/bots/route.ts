// app/api/admin/bots/route.ts

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth' 




export async function GET() {
  try {
    const bots = await prisma.bot.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ bots })
  } catch (err) {
    console.error('[GET_BOTS_ERROR]', err)
    return NextResponse.json({ error: 'Failed to fetch bots' }, { status: 500 })
  }
}














export async function POST(req: Request) {
  try {
    const user = await getAuthUser()

    if (!user || user.email !== 'youremail@domain.com') {
      
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, description, tier, minAmount, performance, fee, imageUrl, bgColor } = body

    if (!name || !description || !tier || !minAmount || !performance || !fee) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const bot = await prisma.bot.create({
      data: {
        name,
        description,
        tier,
        minAmount,
        performance,
        fee,
        imageUrl,
        bgColor,
        stats: {},
      },
    })

    return NextResponse.json({ success: true, bot })
  } catch (err) {
    console.error('[ADMIN_BOT_CREATE_ERROR]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


