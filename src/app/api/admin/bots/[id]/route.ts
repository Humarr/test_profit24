// app/api/admin/bots/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, description, tier, minAmount, performance, fee, imageUrl, bgColor, stats } = body;

  const bot = await prisma.bot.update({
    where: { id: params.id },
    data: { name, description, tier, minAmount, performance, fee, imageUrl, bgColor, stats },
  });

  return NextResponse.json({ bot });
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const admin = await getAdminUser();
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
    await prisma.bot.delete({ where: { id: params.id } });
  
    return NextResponse.json({ message: "Bot deleted" }, { status: 200 });
  }
  