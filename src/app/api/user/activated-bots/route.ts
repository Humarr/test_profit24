// app/api/user/activated-bots/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const activations = await prisma.botActivation.findMany({
      where: { userId: user.id },
      include: { bot: true },
    });

    return NextResponse.json({
      bots: activations.map((a) => a.bot),
    });
  } catch (err) {
    console.error("[GET_ACTIVATED_BOTS_ERROR]", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
