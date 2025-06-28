import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {extractIdFromUrl} from "@/lib/extractIdFromUrl"


    export async function GET(req: NextRequest) {
                try {
                  const id = extractIdFromUrl(req);
                  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
                  const webinar = await prisma.webinar.findUnique({
                    where: { id },
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