// /src/app/api/dashboard/bots/deactivate/route.ts

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
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const existingActivation = await prisma.botActivation.findFirst({
      where: {
        userId: user.id,
        botId,
      },
    });

    if (!existingActivation) {
      return NextResponse.json({ error: 'Bot is not currently activated' }, { status: 404 });
    }

    await prisma.botActivation.delete({
      where: {
        id: existingActivation.id,
      },
    });

    return NextResponse.json({ success: true, message: 'Bot deactivated successfully' });
  } catch (error) {
    console.error('Bot Deactivation Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
