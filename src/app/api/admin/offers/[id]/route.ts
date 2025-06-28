// app/api/admin/offers/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { extractIdFromUrl } from "@/lib/extractIdFromUrl";

export async function PATCH(req: NextRequest) {
  try {
    const id = extractIdFromUrl(req);
    if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    const { title, subtitle, price, features, popular } = await req.json();

    const updatedOffer = await prisma.offer.update({
      where: { id },
      data: {
        title,
        subtitle,
        price,
        features,
        popular: !!popular,
      },
    });

    return NextResponse.json({ offer: updatedOffer });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update offer" }, { status: 500 });
  }
}



export async function DELETE(req: NextRequest) {
    try {
      const id = extractIdFromUrl(req);
      if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  
      await prisma.offer.delete({ where: { id } });
  
      return NextResponse.json({ success: true });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Failed to delete offer" }, { status: 500 });
    }
  }
  