// app/api/user/subscription/route.ts

import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { plan } = await req.json();

    const validPlans = ['Standard', 'Premium', 'Enterprise'];
    if (!plan || !validPlans.includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // 30-day expiry from today
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await prisma.subscription.upsert({
      where: { userId: user.id },
      update: { plan, active: true, expiresAt },
      create: {
        userId: user.id,
        plan,
        active: true,
        expiresAt,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[CREATE_SUBSCRIPTION_ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}



// export async function GET() {
//   try {
//     const user = await getAuthUser();
//     if (!user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const subscription = await prisma.subscription.findUnique({
//       where: { userId: user.id },
//     });

//     return NextResponse.json({
//       isActive: !!subscription,
//       plan: subscription?.plan,
//       expiresAt: subscription?.expiresAt,
//     });
//   } catch (err) {
//     console.error('[GET_SUBSCRIPTION_ERROR]', err);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

// app/api/user/subscription/route.ts

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const subscription = await prisma.subscription.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({ subscription });
  } catch (err) {
    console.error('[GET_SUBSCRIPTION_ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
