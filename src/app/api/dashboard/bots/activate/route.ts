// app/api/bots/activate/route.ts

import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

const BOT_LIMITS = {
  Standard: 1,
  Premium: 5,
  Enterprise: 999, // Treat as unlimited
};

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { botId } = await req.json();
    if (!botId) {
      return NextResponse.json({ error: 'Bot ID is required' }, { status: 400 });
    }

    // 1. Check active subscription
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        active: true,
        expiresAt: { gte: new Date() },
      },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: 'No active subscription. Please subscribe to activate bots.' },
        { status: 403 }
      );
    }

    const plan = subscription.plan as keyof typeof BOT_LIMITS;
    const allowedBots = BOT_LIMITS[plan];

    // 2. Check how many bots the user has already activated
    const activeCount = await prisma.botActivation.count({
      where: {
        userId: user.id,
        active: true,
      },
    });

    if (activeCount >= allowedBots) {
      return NextResponse.json(
        { error: `You've reached the limit of ${allowedBots} bot(s) for your plan.` },
        { status: 403 }
      );
    }

    // 3. Prevent duplicate activation
    const existing = await prisma.botActivation.findUnique({
      where: {
        userId_botId: {
          userId: user.id,
          botId: botId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'This bot has already been activated.' },
        { status: 409 }
      );
    }

    // 4. Create activation
    await prisma.botActivation.create({
      data: {
        userId: user.id,
        botId: botId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[BOT_ACTIVATION_ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
