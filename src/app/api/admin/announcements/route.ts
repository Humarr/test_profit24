import prisma from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";
import { NextResponse } from "next/server";

// interface UpdateData {
//   title?: string
//   content?: string
//   active?: boolean
// }

export async function GET() {
  const user = await getAdminUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ announcements });
}

export async function POST(req: Request) {
  const user = await getAdminUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, content, active } = await req.json();
  if (!title || !content)
    return NextResponse.json(
      { error: "Title and content required" },
      { status: 400 }
    );
  const announcement = await prisma.announcement.create({
    data: { title, content, active: !!active },
  });
  return NextResponse.json({ announcement });
}
