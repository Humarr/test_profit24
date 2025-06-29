'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Gift,
  Video,
  Bot,
  Trophy,
  Settings,
  HelpCircle,
  X,
  Menu,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Dropdown from '@/components/Dropdown'
import Announcements from '@/components/Announcements'

type User = {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
  phone: string | null
} | null

export default function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode
  user: User
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/auth/login')
  }

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Our Offers', href: '/dashboard/offers', icon: Gift },
    { name: 'Webinars', href: '/dashboard/webinars', icon: Video },
    { name: 'Bots Lab', href: '/dashboard/bots-lab', icon: Bot },
    { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: Trophy },
    { name: 'Others', href: '/dashboard/others', icon: Settings },
    { name: 'Help & Support', href: '/dashboard/help-support', icon: HelpCircle },
  ]

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Failed to load user data.
      </div>
    )
  }

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()

  return (
    <div className="flex flex-col md:flex-row h-screen bg-brand-cream-50">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-lg text-brand-slate-700"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="text-xl font-bold text-brand-purple-600">Profit24 SCALPER</div>
        <div className="w-6" />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white text-brand-slate-700 p-4 flex-col border-r">
        <div className="mb-8 p-4">
          <h1 className="text-2xl font-bold text-brand-purple-600">Profit24 SCALPER</h1>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg transition-colors',
                    pathname === link.href
                      ? 'bg-brand-purple-100 text-brand-purple-600'
                      : 'hover:bg-brand-cream-100 text-brand-slate-600'
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto p-4 border-t border-brand-cream-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-purple-100 flex items-center justify-center">
              <span className="text-sm font-medium text-brand-purple-600">
                {getInitials(user.name)}
              </span>
            </div>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-brand-slate-400">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-72 h-full bg-white">
            <div className="flex justify-between items-center p-4 border-b">
              <h1 className="text-xl font-bold text-brand-purple-600">Profit24 SCALPER</h1>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-brand-slate-700"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg transition-colors',
                        pathname === link.href
                          ? 'bg-brand-purple-100 text-brand-purple-600'
                          : 'hover:bg-brand-cream-100 text-brand-slate-600'
                      )}
                    >
                      <link.icon className="w-5 h-5" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-brand-purple-50 p-4 border-b">
          <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4 items-center">
            <div>
              <h2 className="text-lg font-medium text-brand-slate-700">Hi, {user.name}</h2>
              <p className="text-sm text-brand-slate-500">Welcome back</p>
            </div>

            <div className="relative mx-auto w-full max-w-md">{/* Optional search */}</div>

            <div className="flex justify-end">
              <Dropdown
                trigger={
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-brand-purple-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-brand-purple-600">
                        {getInitials(user.name)}
                      </span>
                    </div>
                    <span className="font-medium text-brand-slate-700 hidden sm:inline">
                      {user.name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-brand-slate-500" />
                  </div>
                }
              >
                <Link
                  href={`/dashboard/users/${user.id}`}
                  className="block px-4 py-2 text-sm text-brand-slate-700 hover:bg-brand-purple-50"
                >
                  Profile
                </Link>
                <Link
                  href={`/dashboard/users/${user.id}/settings`}
                  className="block px-4 py-2 text-sm text-brand-slate-700 hover:bg-brand-purple-50"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-brand-slate-700 hover:bg-brand-purple-50"
                >
                  Sign out
                </button>
              </Dropdown>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 scrollbar-hide">
          <Announcements />
          {children}
        </main>
      </div>
    </div>
  )
}
