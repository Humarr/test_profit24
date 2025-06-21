// app/api/user/subscription/route.ts
import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch latest active subscription (assuming you store subscriptions in a table)
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        expiresAt: 'desc',
      },
    });

    if (!subscription) {
      return NextResponse.json({ subscribed: false });
    }

    return NextResponse.json({
      subscribed: true,
      plan: subscription.plan,
      expiresAt: subscription.expiresAt,
    });
  } catch (err) {
    console.error('[SUBSCRIPTION_CHECK_ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
