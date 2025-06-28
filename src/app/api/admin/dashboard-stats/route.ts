// /app/api/admin/dashboard-stats/route.ts
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [users, webinars, resources, announcements, transactions] = await Promise.all([
      prisma.user.count(),
      prisma.webinar.count(),
      prisma.resource.count(),
      prisma.announcement.count(),
      prisma.transaction.count(),
    ])

    return NextResponse.json({ users, webinars, resources, announcements, transactions })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to load dashboard stats' }, { status: 500 })
  }
}
