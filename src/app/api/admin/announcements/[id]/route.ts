//api/admin/announcements/[id]/route.ts
import prisma from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";

interface UpdateData {
  title?: string;
  content?: string;
  active?: boolean;
}

// Helper to extract ID from the URL
function extractIdFromUrl(req: NextRequest): string | null {
  const segments = req.nextUrl.pathname.split("/");
  return segments[segments.length - 1] || null;
}

// PATCH
export async function PATCH(req: NextRequest) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const { title, content, active } = await req.json();

  const updateData: UpdateData = {};
  if (title !== undefined) updateData.title = title;
  if (content !== undefined) updateData.content = content;
  if (active !== undefined) updateData.active = active;

  const announcement = await prisma.announcement.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json({ announcement });
}

// DELETE
export async function DELETE(req: NextRequest) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  await prisma.announcement.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
