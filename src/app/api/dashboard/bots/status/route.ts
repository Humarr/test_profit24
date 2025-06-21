// /src/app/api/dashboard/bots/status/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const activeBots = await prisma.botActivation.findMany({
      where: {
        userId: user.id,
      },
      include: {
        bot: true, // include bot details
      },
    });

    return NextResponse.json({
      success: true,
      bots: activeBots.map(({ bot }) => ({
        id: bot.id,
        name: bot.name,
        description: bot.description,
        // Add any other bot fields you want
      })),
    });
  } catch (error) {
    console.error('Bot Status Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
