// app/api/admin/webinars/[id]/route.ts

import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { extractIdFromUrl } from '@/lib/extractIdFromUrl';

export async function DELETE(req: NextRequest) {
  try {
    const user = await getAuthUser();

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }


    const id = extractIdFromUrl(req);
    if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    
    const deleted = await prisma.webinar.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error('[DELETE_WEBINAR]', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}


export async function PATCH(req: NextRequest) {
    try {
      const user = await getAuthUser();
  
      if (!user || user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      const { title, thumbnail, duration, videoUrl } = await req.json();

      const id = extractIdFromUrl(req);
      if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  
      const updated = await prisma.webinar.update({
        where: { id },
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
  