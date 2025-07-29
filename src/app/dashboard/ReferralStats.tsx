/* eslint-disable react/no-unescaped-entities */
'use client'

import { useEffect, useState } from 'react'
import { Clipboard, ClipboardCheck } from 'lucide-react'
import { User } from '@prisma/client'
// import { ENDPOINT_URL } from '../../../endpoint'

export default function ReferralStats() {
  const [data, setData] = useState<{ count: number, users: User[] } | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch(`/api/dashboard/referrals`, {
      method: 'GET',
      // cache: 'no-store', // ensure it's always fresh
      credentials: 'include'
    })
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const referralCode = typeof window !== 'undefined' && localStorage.getItem('referral_code')
  const referralLink = `${window?.location.origin}/auth/register?ref=${referralCode}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!data) return <p className="text-sm text-gray-500">Loading referral stats...</p>

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold text-brand-slate-700 mb-4">Referral Stats</h2>

      <p className="mb-2 text-brand-slate-500">You've referred <strong>{data.count}</strong> user{data.count !== 1 && 's'}</p>

      <div className="flex items-center gap-2 bg-brand-slate-50 px-4 py-2 rounded-md border border-brand-cream-300 w-full max-w-lg mb-4">
        <span className="truncate">{referralLink}</span>
        <button onClick={copyToClipboard} className="text-brand-purple-500">
          {copied ? <ClipboardCheck size={18} /> : <Clipboard size={18} />}
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-medium text-brand-slate-600 mb-2">People You Referred:</h3>
        {data.users.length === 0 ? (
          <p className="text-sm text-brand-slate-400">No one yet. Share your link to start earning!</p>
        ) : (
          <ul className="text-sm space-y-2">
            {data.users.map((u, i) => (
              <li key={i} className="bg-brand-slate-50 rounded-lg p-3 border border-brand-cream-300">
                <strong>{u.name || 'Unnamed'}</strong> — {u.email} <br />
                <span className="text-brand-slate-400 text-xs">Joined on {new Date(u.createdAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
