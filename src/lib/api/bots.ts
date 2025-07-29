// lib/api/bots.ts
import {cookies} from 'next/headers'
import { ENDPOINT_URL } from '../../../endpoint';

export async function fetchAllBots() {
    const res = await fetch(`${ENDPOINT_URL}/api/dashboard/bots/all`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${(await cookies()).get('auth_token')?.value}`,
      },
    })
  
    if (!res.ok) {
      throw new Error('Failed to fetch bots')
    }
  
    return res.json()
  }
  

  export async function activateBot(botId: string) {
    const res = await fetch(`${ENDPOINT_URL}/api/user/activate-bot`, {
      method: "POST",
      body: JSON.stringify({ botId }),
    });
    
    // const result = await res.json();
    
    if (res.status === 403) {
      // No active subscription → redirect client-side
    //   router.push('/dashboard/offers');
    //   return;
    return 403;
    }
    if (!res.ok) {
      return 500;
    }

    
    return 200;
}