'use client'

import { useEffect, useState } from 'react'
import {  Users, Video, FileText, Speaker, CreditCard } from 'lucide-react'
import { useToast } from '@/components/toast/useToast'
import Spinner from '@/components/Spinner'
// import { ENDPOINT_URL } from '../../../../endpoint'

export default function AdminDashboardPage() {
  const toast = useToast()
  const [stats, setStats] = useState({
    users: 0,
    webinars: 0,
    resources: 0,
    announcements: 0,
    transactions: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/admin/dashboard-stats`, {
          method: 'GET',
          // cache: 'no-store', // ensure it's always fresh
          credentials: 'include'
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to load stats')
        setStats(data)
      } catch (e) {
        toast((e as Error).message, 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [toast])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-brand-purple-600 mb-6">Admin Dashboard</h1>
      {loading ? (
        <Spinner/>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard icon={<Users className="text-brand-purple-500"/>} label="Users" value={stats.users}/>
          <StatCard icon={<Video className="text-brand-purple-500"/>} label="Webinars" value={stats.webinars}/>
          <StatCard icon={<FileText className="text-brand-purple-500"/>} label="Resources" value={stats.resources}/>
          <StatCard icon={<Speaker className="text-brand-purple-500"/>} label="Announcements" value={stats.announcements}/>
          <StatCard icon={<CreditCard className="text-brand-purple-500"/>} label="Transactions" value={stats.transactions}/>
        </div>
      )}
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
      <div className="mr-4">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-brand-purple-700">{value}</p>
      </div>
    </div>
  )
}
