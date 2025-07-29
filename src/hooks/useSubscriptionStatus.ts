'use client'

import { ENDPOINT_URL } from "../../endpoint"
import { useEffect, useState } from 'react'

export default function useSubscriptionStatus() {
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(false)
  const [plan, setPlan] = useState<string | null>(null)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${ENDPOINT_URL}/api/user/subscription/active`, {
          method: 'GET',
      
          cache: 'no-store', // ensure it's always fresh
          credentials: 'include'
        })
        const data = await res.json()

        if (data.active) {
          setActive(true)
          setPlan(data.plan)
        }
      } catch (error) {
        console.error('Failed to fetch subscription status:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [])

  return { loading, active, plan }
}
