import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: { createdAt: "desc" }
    });
    console.log(resources);
    return NextResponse.json({ resources });
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Failed to fetch resources');
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, fileUrl, thumbnailUrl, category } = body;

    if (!title || !fileUrl || !thumbnailUrl || !category) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newResource = await prisma.resource.create({
      data: { title, fileUrl, thumbnailUrl, category }
    });

    return NextResponse.json({ resource: newResource });
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Failed to create resource');
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}