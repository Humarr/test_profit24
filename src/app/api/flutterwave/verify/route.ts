import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get("reference")
  if (!reference) return NextResponse.json({ success: false, error: "Missing transaction reference" }, { status: 400 })

  try {
    const flutterwaveSecret = process.env.FLUTTERWAVE_SECRET_KEY
    const res = await fetch(`https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${flutterwaveSecret}`,
        "Content-Type": "application/json",
      },
    })

    const result = await res.json()
    const data = result?.data
    if (!result.status || !data || data.status !== "successful") {
      return NextResponse.json({ success: false, error: "Verification failed or payment not successful" }, { status: 400 })
    }

    const { meta } = data
    // const { meta, currency, amount } = data
    const plan = meta?.plan
    const userId = meta?.userId

    // Check if already verified
    const trx = await prisma.transaction.findUnique({ where: { reference } })
    if (!trx || trx.status === "success") {
      return NextResponse.json({ success: true, message: "Already verified" })
    }

    // Mark as success
    await prisma.transaction.update({
      where: { reference },
      data: { status: "success" },
    })

    // Subscription logic
    const expiresAt = new Date()
    const days = plan === 'trial' ? 30 : plan === 'recommended' ? 90 : plan === 'institutional' ? 180 : 365
    expiresAt.setDate(expiresAt.getDate() + days)

    await prisma.subscription.upsert({
      where: { userId },
      update: { plan, active: true, expiresAt },
      create: { userId, plan, active: true, expiresAt },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    const error = err as Error
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
