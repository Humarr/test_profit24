// app/api/admin/webinars/[id]/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser();

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const deleted = await prisma.webinar.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error('[DELETE_WEBINAR]', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}


export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
      const user = await getAuthUser();
  
      if (!user || user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      const { title, thumbnail, duration, videoUrl } = await req.json();
  
      const updated = await prisma.webinar.update({
        where: { id: params.id },
        data: {
          ...(title && { title }),
          ...(thumbnail && { thumbnail }),
          ...(duration && { duration }),
          ...(videoUrl && { videoUrl }),
        },
      });
  
      return NextResponse.json({ updated });
    } catch (error) {
      console.error('[UPDATE_WEBINAR]', error);
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
  }
  