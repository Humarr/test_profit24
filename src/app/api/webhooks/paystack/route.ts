import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  const { event, data } = await req.json()
  if (event !== "charge.success") return NextResponse.json({ received: true })

  const { reference, metadata } = data
  const { userId, plan } = metadata
  const trx = await prisma.transaction.findUnique({ where: { reference } })
  if (!trx || trx.status === "success") return NextResponse.json({ received: true })

  await prisma.transaction.update({ where: { reference }, data: { status: "success" } })

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
