// /src/app/api/dashboard/bots/activate/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { botId } = await req.json();

  if (!botId) {
    return NextResponse.json({ error: 'Missing bot ID' }, { status: 400 });
  }

  try {
    // Optional: Check if bot exists
    const bot = await prisma.bot.findUnique({ where: { id: botId } });
    if (!bot) {
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
    }

    // Optional: Prevent duplicate activations
    const existingActivation = await prisma.botActivation.findFirst({
      where: {
        user: { email: session.user.email },
        botId: botId,
      },
    });

    if (existingActivation) {
      return NextResponse.json({ error: 'Bot already activated' }, { status: 409 });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const activation = await prisma.botActivation.create({
      data: {
        userId: user.id,
        botId,
      },
    });

    return NextResponse.json({ success: true, activation });
  } catch (error) {
    console.error('Bot Activation Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
