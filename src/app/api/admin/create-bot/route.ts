// app/api/admin/create-bot/route.ts

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      name,
      description,
      tier,
      minAmount,
      performance,
      fee,
      bgColor,
      imageUrl,
    } = body

    if (!name || !description || !tier || !minAmount || !performance || !fee) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newBot = await prisma.bot.create({
      data: {
        name,
        description,
        tier,
        minAmount,
        performance,
        fee,
        bgColor: bgColor || 'bg-white',
        imageUrl,
        stats: {}, // you can populate later
      },
    })

    return NextResponse.json({ success: true, bot: newBot })
  } catch (err) {
    console.error('[CREATE_BOT_ERROR]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
