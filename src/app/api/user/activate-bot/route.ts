// app/api/user/activate-bot/route.ts

import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { botId } = await req.json()

    if (!botId) {
      return NextResponse.json({ error: 'Missing bot ID' }, { status: 400 })
    }

    // Confirm bot exists
    const bot = await prisma.bot.findUnique({
      where: { id: botId },
    })

    if (!bot) {
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 })
    }

    // Confirm user has active subscription
    const activeSub = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        active: true,
        expiresAt: { gt: new Date() },
      },
    })

    if (!activeSub) {
      return NextResponse.json({ error: 'No active subscription' }, { status: 403 })
    }

    // Check for existing activation
    const alreadyActivated = await prisma.botActivation.findUnique({
      where: {
        userId_botId: {
          userId: user.id,
          botId,
        },
      },
    })

    if (alreadyActivated) {
      return NextResponse.json({ error: 'Bot already activated' }, { status: 409 })
    }

    // Create activation
    await prisma.botActivation.create({
      data: {
        userId: user.id,
        botId,
      },
    })

    return NextResponse.json({ success: true, message: 'Bot activated successfully' })
  } catch (err) {
    console.error('[ACTIVATE_BOT_ERROR]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
