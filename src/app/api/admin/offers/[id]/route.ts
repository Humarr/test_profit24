// app/api/admin/offers/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
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



export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
  
      await prisma.offer.delete({ where: { id } });
  
      return NextResponse.json({ success: true });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Failed to delete offer" }, { status: 500 });
    }
  }
  