// app/api/flutterwave/initialize/route.ts

import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { plan, amount, currency = 'USD' } = await req.json()
  if (!plan || !amount) return NextResponse.json({ error: 'Missing plan or amount' }, { status: 400 })

  const tx_ref = `trx_${user.id}_${Date.now()}`
  const amountFloat = parseFloat(amount)

  await prisma.transaction.create({
    data: {
      userId: user.id,
      plan,
      amount: amountFloat,
      reference: tx_ref,
      status: 'initialized',
      currency,
      metadata: { userId: user.id, plan },
    },
  })

  return NextResponse.json({
    tx_ref,
    email: user.email,
    userId: user.id,
    currency,
  })
}
