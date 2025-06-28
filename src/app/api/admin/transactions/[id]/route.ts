// app/api/admin/transactions/[id]/route.ts
import prisma from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";
import { extractIdFromUrl } from "@/lib/extractIdFromUrl";

export async function PATCH(req: NextRequest) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  const { status } = await req.json();

  if (!status) return NextResponse.json({ error: "Status required" }, { status: 400 });

  const transaction = await prisma.transaction.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ transaction });
}
