// File: src/app/api/register/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password, name, phone, referralCode } = body

  try {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 10)
    const generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase()

    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash: hashed,
        name,
        phone,
        referralCode: generatedCode,
        referredBy: referralCode || null,
      }
    })

    return NextResponse.json({ user: { email: newUser.email, id: newUser.id } })
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
