// components/Sidebar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'

export default function Sidebar({admin_name}: {admin_name: string}) {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/users', label: 'Users' },
    { href: '/admin/webinars', label: 'Webinars' },
    { href: '/admin/resources', label: 'Resources' },
    { href: '/admin/subscriptions', label: 'Subscriptions' },
    { href: '/admin/transactions', label: 'Transactions' },
    { href: '/admin/announcements', label: 'Announcements' },
    { href: '/admin/bots', label: 'Bots' },
    { href: '/admin/offers', label: 'Offers' },
  ]

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-brand-purple-700 text-white p-4">
        <span className="font-bold text-2xl"> Hi, <span className="font-normal text-brand-white text-lg">{admin_name}</span></span>
        <button onClick={() => setOpen(!open)} className="text-2xl cursor-pointer"><Menu /></button>
      </div>

      {/* Sidebar */}
      <aside className={`bg-brand-slate-800 text-white md:w-64 md:flex-shrink-0 ${open ? 'block' : 'hidden'} md:block`}>
        <nav className="flex flex-col p-4 space-y-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className=" rounded transition hover:bg-brand-purple-700 hover:text-white"
            >
              <button onClick={() => setOpen(false)}
              className="py-2 px-3 cursor-pointer"
                >{label}</button>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
