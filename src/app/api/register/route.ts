import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    
  try {
    const body = await req.json();
    const {
      name,
      email,
      password,
      experience,
      referralId,
      tradingAmount,
      phone,
    } = body;

    // ✅ Simple validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    // ✅ Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use.' },
        { status: 400 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // ✅ Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        experience,
        referralId,
        tradingAmount,
        phone,
      },
    });

    return NextResponse.json(
      { message: 'User created successfully', user: { email: user.email, id: user.id } },
      { status: 201 }
    );
  } catch (error) {
    console.error('REGISTER_ERROR:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
