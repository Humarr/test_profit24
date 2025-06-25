// /api/admin/resources/[id]/route.ts (PATCH)
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { title, fileUrl, category } = body;

    const updated = await prisma.resource.update({
      where: { id },
      data: { title, fileUrl, category }
    });

    return NextResponse.json({ resource: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update resource" }, { status: 500 });
  }
}


// /api/admin/resources/[id]/route.ts (DELETE)


export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await prisma.resource.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete resource" }, { status: 500 });
  }
}
