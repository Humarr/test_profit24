import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getAuthUser } from "@/lib/auth"

export async function GET(req: Request) {
  const user = await getAuthUser()
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(req.url)
  const reference = url.searchParams.get("reference")

  if (!reference) {
    return NextResponse.json({ success: false, error: "Missing reference" }, { status: 400 })
  }

  const trx = await prisma.transaction.findUnique({ where: { reference } })
  if (!trx) {
    return NextResponse.json({ success: false, error: "Transaction not found" }, { status: 404 })
  }

  if (trx.status !== "success") {
    return NextResponse.json({ success: false, error: "Payment not completed" }, { status: 400 })
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
  })

  if (!subscription || subscription.plan !== trx.plan || subscription.expiresAt < new Date()) {
    return NextResponse.json({ success: false, error: "Subscription looks invalid" }, { status: 400 })
  }

  // ✅ Optional: enrich user profile data
  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: { name: true }
  })

  return NextResponse.json({
    success: true,
    reference,
    plan: trx.plan,
    email: user.email,
    fullName: profile?.name || "",
    paidAmount: trx.amount, // optional
    currency: trx.currency || "NGN", // optional
  })
}
