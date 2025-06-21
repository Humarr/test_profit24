// app/api/user/subscription/active/route.ts

import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'
import { getActiveSubscription } from '@/lib/subscription'

export async function GET() {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const subscription = await getActiveSubscription(user.id)

    if (!subscription) {
      return NextResponse.json({ active: false })
    }

    return NextResponse.json({
      active: true,
      plan: subscription.plan,
      expiresAt: subscription.expiresAt,
    })
  } catch (err) {
    console.error('[GET_ACTIVE_SUBSCRIPTION_ERROR]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
