// /api/admin/resources/route.ts (GET)
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json({ resources });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}


// /api/admin/resources/route.ts (POST)


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, fileUrl, category } = body;

    if (!title || !fileUrl || !category) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newResource = await prisma.resource.create({
      data: { title, fileUrl, category }
    });

    return NextResponse.json({ resource: newResource });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 });
  }
}
