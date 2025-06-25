import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
      const webinars = await prisma.webinar.findMany({
        orderBy: { createdAt: 'desc' },
      });
  
      return NextResponse.json({ webinars });
    } catch (error) {
      console.error('[GET_WEBINARS]', error);
      return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
  }