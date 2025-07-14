// app/api/paystack/initialize/route.ts
import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
// import fetch from 'node-fetch';

export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { plan, amount } = await req.json();
  if (!plan || !amount) return NextResponse.json({ error: 'Missing plan or amount' }, { status: 400 });

  
  // Check current subscription status
  const existingSub = await prisma.subscription.findUnique({
    where: { userId: user.id }
  });

  const now = new Date();

  if (existingSub && existingSub.active && existingSub.expiresAt > now) {
    return NextResponse.json({
      error: `You already have an active subscription that expires on ${existingSub.expiresAt.toDateString()}`,
    }, { status: 400 });
  }

  const reference = `ref_${user.id}_${Date.now()}`;

  const initRes = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: user.email,
      amount: parseInt(amount, 10) * 100, // in kobo
      reference,
      metadata: { userId: user.id, plan },
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
    }),
  });
  

  const data = await initRes.json();
  if (!data.status) return NextResponse.json({ error: data.message }, { status: 400 });

  await prisma.transaction.create({
    data: {
      userId: user.id,
      plan,
      amount: parseInt(amount, 10),
      reference,
      status: 'initialized',
      currency: "NGN", //to be removed in case we're rolling back to this
      metadata: { userId: user.id, plan },
    },
  });

  return NextResponse.json({ authorization_url: data.data.authorization_url });
}
