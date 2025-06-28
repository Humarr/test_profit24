// app/api/admin/bots/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";

// Helper to get bot ID from URL
function getIdFromUrl(req: NextRequest): string | null {
  const segments = req.nextUrl.pathname.split("/");
  return segments[segments.length - 1] || null;
}

export async function PATCH(req: NextRequest) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = getIdFromUrl(req);
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const body = await req.json();
  const { name, description, tier, minAmount, performance, fee, imageUrl, bgColor, stats } = body;

  const bot = await prisma.bot.update({
    where: { id },
    data: { name, description, tier, minAmount, performance, fee, imageUrl, bgColor, stats },
  });

  return NextResponse.json({ bot });
}

export async function DELETE(req: NextRequest) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = getIdFromUrl(req);
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  await prisma.bot.delete({ where: { id } });

  return NextResponse.json({ message: "Bot deleted" }, { status: 200 });
}
