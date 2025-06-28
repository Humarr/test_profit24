
// app/api/dashboard/offers/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ offers });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
  }
}
