// app/admin/layout.tsx
import { getAdminUser } from '@/lib/auth'
import Sidebar from '@/components/admin/Sidebar'
import { ReactNode } from 'react'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getAdminUser()

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl">Unauthorized</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar admin_name={user.name}/>
      <main className="flex-1 bg-brand-cream-100 p-4 md:p-8 overflow-auto scrollbar-hide">
        {children}
      </main>
    </div>
  )
}
