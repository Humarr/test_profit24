// app/api/webhooks/paystack/route.ts
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  const payload = await req.json()
  // console.log("\npayload: ", payload)
  const { event, data } = payload

  if (event !== "charge.success") return NextResponse.json({ received: true })

  const { reference, metadata } = data
  const { userId, plan } = metadata
  
  // console.log("\nreference, metadata: ", reference, metadata)
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

  // console.log(plan)
  const trx = await prisma.transaction.findUnique({ where: { reference } })
  if (!trx) return NextResponse.json({ error: "Transaction not found" }, { status: 404 })

  if (trx.status === "success") return NextResponse.json({ received: true })

  await prisma.transaction.update({ where: { reference }, data: { status: "success" } })

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 30)

  await prisma.subscription.upsert({
    where: { userId: trx.userId },
    update: { plan: trx.plan, active: true, expiresAt },
    create: { userId: trx.userId, plan: trx.plan, active: true, expiresAt },
  })

  return NextResponse.json({ received: true })
}
