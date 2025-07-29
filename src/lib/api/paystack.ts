// lib/api/paystack.ts
import {cookies} from 'next/headers'
export async function verifyPaystackPayment(reference: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/paystack/verify?reference=${reference}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${(await cookies()).get('auth_token')?.value}`,
      },
    })
  
    if (!res.ok) {
      throw new Error('Failed to verify payment')
    }
  
    return res.json()
  }
  