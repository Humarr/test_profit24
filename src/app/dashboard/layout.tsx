'use client';

import Link from 'next/link'
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
  Search,
  ChevronDown
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Our Offers', href: '/dashboard/offers', icon: Gift },
    { name: 'Webinars', href: '/dashboard/webinars', icon: Video },
    { name: 'Bots Lab', href: '/dashboard/bots-lab', icon: Bot },
    { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: Trophy },
    { name: 'Others', href: '/dashboard/others', icon: Settings },
    { name: 'Help & Support', href: '/dashboard/help-support', icon: HelpCircle },
  ]

  return (
    <div className="flex flex-col md:flex-row h-screen bg-brand-cream-50">
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-lg text-brand-slate-700"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="text-xl font-bold text-brand-purple-600">Profit24 SCALPER</div>
        <div className="w-6"></div> {/* Spacer */}
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 bg-white text-brand-slate-700 p-4 flex-col border-r">
        {/* Logo */}
        <div className="mb-8 p-4">
          <h1 className="text-2xl font-bold text-brand-purple-600">Profit24 SCALPER</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-colors",
                    pathname === link.href 
                      ? "bg-brand-purple-100 text-brand-purple-600"
                      : "hover:bg-brand-cream-100 text-brand-slate-600"
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User/Settings at bottom */}
        <div className="mt-auto p-4 border-t border-brand-cream-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-purple-100 flex items-center justify-center">
              <span className="text-sm font-medium text-brand-purple-600">OM</span>
            </div>
            <div>
              <p className="font-medium">Omoluabi</p>
              <p className="text-xs text-brand-slate-400">Premium Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative w-72 h-full bg-white">
            <div className="flex justify-between items-center p-4 border-b">
              <h1 className="text-xl font-bold text-brand-purple-600">Profit24 SCALPER</h1>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-brand-slate-700"
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
                        "flex items-center gap-3 p-3 rounded-lg transition-colors",
                        pathname === link.href 
                          ? "bg-brand-purple-100 text-brand-purple-600"
                          : "hover:bg-brand-cream-100 text-brand-slate-600"
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
        {/* Header */}
        <header className="bg-brand-purple-50 p-4 border-b">
          <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4 items-center">
            {/* Greeting */}
            <div>
              <h2 className="text-lg font-medium text-brand-slate-700">Hi, Omoluabi</h2>
              <p className="text-sm text-brand-slate-500">Welcome back</p>
            </div>

            {/* Search - Center column */}
            <div className="relative mx-auto w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-brand-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple-200"
              />
            </div>

            {/* User Dropdown */}
            <div className="flex justify-end">
              <div className="relative group">
                <button className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-purple-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-brand-purple-600">OM</span>
                  </div>
                  <span className="font-medium text-brand-slate-700 hidden sm:inline">Omoluabi</span>
                  <ChevronDown className="w-4 h-4 text-brand-slate-500" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 hidden group-hover:block border border-brand-cream-200">
                  <a href="#" className="block px-4 py-2 text-sm text-brand-slate-700 hover:bg-brand-purple-50">Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-brand-slate-700 hover:bg-brand-purple-50">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-brand-slate-700 hover:bg-brand-purple-50">Sign out</a>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6 scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  )
}