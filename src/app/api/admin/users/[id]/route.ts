// /app/api/admin/users/[id]/route.ts
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { extractIdFromUrl } from "@/lib/extractIdFromUrl";

export async function PATCH(req: NextRequest) {
  const admin = await getAdminUser();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  const data = await req.json();

  const { name, email, phone, role, subscription } = data;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        role,
      },
    });

    // If admin wants to update subscription
    if (subscription) {
      const existingSub = await prisma.subscription.findUnique({ where: { userId: id } });
      if (existingSub) {
        await prisma.subscription.update({
          where: { userId: id },
          data: {
            plan: subscription.plan,
            active: subscription.active,
            expiresAt: new Date(subscription.expiresAt),
          },
        });
      } else {
        await prisma.subscription.create({
          data: {
            userId: id,
            plan: subscription.plan,
            active: subscription.active,
            expiresAt: new Date(subscription.expiresAt),
          },
        });
      }
    }

    return NextResponse.json({ user: updatedUser });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}


// /app/api/admin/users/[id]/route.ts

export async function DELETE(req: NextRequest) {
  const admin = await getAdminUser();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    // Remove related data first
    await prisma.pendingPayment.deleteMany({ where: { userId: id } });
    await prisma.transaction.deleteMany({ where: { userId: id } });
    await prisma.botActivation.deleteMany({ where: { userId: id } });
    await prisma.subscription.deleteMany({ where: { userId: id } });

    // Delete the user last
    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ message: "User deleted" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
