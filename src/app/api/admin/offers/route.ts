// app/api/admin/offers/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ offers });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
  }
}



export async function POST(req: Request) {
    try {
      const { title, subtitle, price, features, popular } = await req.json();
  
      if (!title || !subtitle || !features || price == null) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
      }
  
      const newOffer = await prisma.offer.create({
        data: {
          title,
          subtitle,
          price,
          features,
          popular: !!popular,
        },
      });
  
      return NextResponse.json({ offer: newOffer });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Failed to create offer" }, { status: 500 });
    }
  }
  