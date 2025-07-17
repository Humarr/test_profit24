// app/api/webhooks/flutterwave/route.ts

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  const { data, event } = await req.json()
  if (event !== "charge.completed") return NextResponse.json({ received: true })

  const { tx_ref, status, meta } = data
//   const { tx_ref, status, customer, meta } = data
  const { userId, plan } = meta || {}

  if (status !== "successful") return NextResponse.json({ received: true })

  const trx = await prisma.transaction.findUnique({ where: { reference: tx_ref } })
  if (!trx || trx.status === "success") return NextResponse.json({ received: true })

  await prisma.transaction.update({ where: { reference: tx_ref }, data: { status: "success" } })

  const expiresAt = new Date()
  const length = plan === 'trial' ? 30 : plan === 'recommended' ? 90 : plan === 'institutional' ? 180 : 365
  expiresAt.setDate(expiresAt.getDate() + length)

  await prisma.subscription.upsert({
    where: { userId },
    update: { plan, active: true, expiresAt },
    create: { userId, plan, active: true, expiresAt },
  })

  return NextResponse.json({ received: true })
}
