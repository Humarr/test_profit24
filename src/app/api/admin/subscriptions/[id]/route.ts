import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { extractIdFromUrl } from "@/lib/extractIdFromUrl";

export async function PATCH(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ error: "ID missing" }, { status: 400 });
  const body = await req.json();
  try {
    const updated = await prisma.subscription.update({
      where: { id },
      data: {
        plan: body.plan,
        active: body.active,
        expiresAt: new Date(body.expiresAt),
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ error: "ID missing" }, { status: 400 });
  try {
    await prisma.subscription.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
