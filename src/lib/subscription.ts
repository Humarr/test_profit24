// lib/subscription.ts
import { cookies } from 'next/headers';
import { ENDPOINT_URL } from '../../endpoint'

export async function getActiveSubscription() {
  try {
    // const now = new Date()

    // const subscription = await prisma.subscription.findFirst({
    //   where: {
    //     userId,
    //     active: true,
    //     expiresAt: {
    //       gt: now, // Expires in the future
    //     },
    //   },
    //   orderBy: {
    //     expiresAt: 'desc', // If user has multiple (just in case), pick latest
    //   },
    // })

    const subscription = await fetch(`${ENDPOINT_URL}/api/user/subscription/active`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${
          (await cookies()).get('auth_token')?.value}`,
      },
      // cache: 'no-store', // ensure it's always fresh
      credentials: 'include'
    })

    return subscription.json() // could be null
  } catch (err) {
    console.error('[GET_ACTIVE_SUBSCRIPTION_ERROR]', err)
    return null
  }
}
