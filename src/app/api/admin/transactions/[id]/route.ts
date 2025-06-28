// app/api/admin/transactions/[id]/route.ts
import prisma from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = await params.id;
  const { status } = await req.json();

  if (!status) return NextResponse.json({ error: "Status required" }, { status: 400 });

  const transaction = await prisma.transaction.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ transaction });
}
