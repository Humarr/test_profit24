// app/api/admin/webinars/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const user = await getAdminUser();

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, thumbnail, duration, videoUrl } = await req.json();

    if (!title || !thumbnail || !duration || !videoUrl) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const webinar = await prisma.webinar.create({
      data: {
        title,
        thumbnail,
        duration,
        videoUrl,
      },
    });

    return NextResponse.json({ webinar });
  } catch (error) {
    console.error('[CREATE_WEBINAR]', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}


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
  
