import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

    export async function GET(req: Request, { params }: { params: { id: string } }) {
                try {
                  const webinar = await prisma.webinar.findUnique({
                    where: { id: params.id },
                  });
  
                  if (!webinar) {
                    return NextResponse.json({ error: 'Webinar not found' }, { status: 404 });
                  }
  
                  return NextResponse.json({ webinar });
                } catch (error) {
                  console.error('[GET_WEBINAR]', error);
                  return NextResponse.json({ error: 'Internal error' }, { status: 500 });
                }
              }