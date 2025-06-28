// app/api/admin/bots/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const bots = await prisma.bot.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ bots });
}


export async function POST(req: Request) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, description, tier, minAmount, performance, fee, imageUrl, bgColor, stats } = body;

  if (!name || !description || !tier || !minAmount || !performance || !fee) {
    return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
  }

  const bot = await prisma.bot.create({
    data: {
      name,
      description,
      tier,
      minAmount,
      performance,
      fee,
      imageUrl,
      bgColor,
      stats: stats || {},
    },
  });

  return NextResponse.json({ bot }, { status: 201 });
}
