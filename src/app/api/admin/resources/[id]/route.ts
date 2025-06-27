import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// /api/admin/resources/[id]/route.ts (PATCH)
export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { title, fileUrl, thumbnailUrl, category } = body;

    const updated = await prisma.resource.update({
      where: { id },
      data: { title, fileUrl, thumbnailUrl, category }
    });

    return NextResponse.json({ resource: updated });
  } catch (error) {
    const err = error instanceof Error ? error : new Error("Failed to update resource");
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


// /api/admin/resources/[id]/route.ts (DELETE)
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;

    await prisma.resource.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    const err = error instanceof Error ? error : new Error("Failed to delete resource");
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
