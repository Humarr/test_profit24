import prisma from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";

interface UpdateData {
  title?: string;
  content?: string;
  active?: boolean;
}

// PATCH
export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content, active } = await req.json();
  const updateData: Record<string, UpdateData> = {};
  if (title !== undefined) updateData.title = title;
  if (content !== undefined) updateData.content = content;
  if (active !== undefined) updateData.active = active;

  const announcement = await prisma.announcement.update({
    where: { id: context.params.id },
    data: updateData,
  });

  return NextResponse.json({ announcement });
}

// DELETE
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.announcement.delete({ where: { id: context.params.id } });

  return NextResponse.json({ success: true });
}
