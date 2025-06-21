// lib/subscription.ts

import prisma from '@/lib/prisma'

export async function getActiveSubscription(userId: string) {
  try {
    const now = new Date()

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        active: true,
        expiresAt: {
          gt: now, // Expires in the future
        },
      },
      orderBy: {
        expiresAt: 'desc', // If user has multiple (just in case), pick latest
      },
    })

    return subscription // could be null
  } catch (err) {
    console.error('[GET_ACTIVE_SUBSCRIPTION_ERROR]', err)
    return null
  }
}
