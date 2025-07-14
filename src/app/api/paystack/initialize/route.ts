// app/api/paystack/initialize/route.ts

import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { plan, amount, currency = 'NGN' } = await req.json()
  if (!plan || !amount) return NextResponse.json({ error: 'Missing plan or amount' }, { status: 400 })

  const reference = `ref_${user.id}_${Date.now()}`
  const amountInBaseUnit = parseFloat(amount) * 100 // e.g. $5.00 => 500 cents

  const res = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: user.email,
      amount: amountInBaseUnit,
      currency, // 👈 crucial for USD or GBP
      reference,
      metadata: { userId: user.id, plan },
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
    }),
  })

  const data = await res.json()
  if (!data.status) {
    return NextResponse.json({ error: data.message }, { status: 400 })
  }

  await prisma.transaction.create({
    data: {
      userId: user.id,
      plan,
      amount: parseFloat(amount),
      reference,
      status: 'initialized',
      currency,
      metadata: { userId: user.id, plan },
    },
  })

  return NextResponse.json({
    reference,
    email: user.email,
    authorization_url: data.data.authorization_url,
  })
}
