import prisma from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";
import { NextResponse } from "next/server";

interface UpdateData {
  title?: string;
  content?: string;
  active?: boolean;
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getAdminUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, content, active } = await req.json();
  const updateData: UpdateData = {};
  if (title !== undefined) updateData.title = title;
  if (content !== undefined) updateData.content = content;
  if (active !== undefined) updateData.active = active;
  const announcement = await prisma.announcement.update({
    where: { id: params.id },
    data: updateData,
  });
  return NextResponse.json({ announcement });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getAdminUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await prisma.announcement.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
