import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { extractIdFromUrl } from "@/lib/extractIdFromUrl";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  tradingAmount: string;
  experience: string;
  role: string;
  createdAt: Date;
  myReferralCode: string;
  referredBy: {
    id: string;
    name: string;
    email: string;
    myReferralCode: string;
  } | null;
  referredUsers: { id: string; name: string; email: string; createdAt: Date }[];
  subscriptions: {
    id: string;
    plan: string;
    active: boolean;
    expiresAt: Date;
  }[];
  activations: {
    id: string;
    active: boolean;
    startedAt: Date;
    bot: { id: string; name: string; tier: string; performance: string };
  }[];
  transactions: {
    id: string;
    amount: string;
    plan: string;
    status: string;
    reference: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export async function GET(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id)
    return NextResponse.json({ error: "User ID missing" }, { status: 400 });

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        tradingAmount: true,
        experience: true,
        role: true,
        createdAt: true,
        myReferralCode: true,

        referredBy: {
          select: { id: true, name: true, email: true, myReferralCode: true },
        },
        referredUsers: {
          select: { id: true, name: true, email: true, createdAt: true },
        },
        subscriptions: {
          select: { id: true, plan: true, active: true, expiresAt: true },
        },
        activations: {
          select: {
            id: true,
            active: true,
            startedAt: true,
            bot: {
              select: { id: true, name: true, tier: true, performance: true },
            },
          },
        },
        transactions: {
          select: {
            id: true,
            amount: true,
            plan: true,
            status: true,
            reference: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("[GET_USER_PROFILE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id)
    return NextResponse.json({ error: "User ID missing" }, { status: 400 });

  if (req.method !== "PATCH") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const data = await req.json();
    // const allowedFields = [
    //   "name",
    //   "email",
    //   "phone",
    //   "tradingAmount",
    //   "experience",
    //   "role",
    // ];
    // // const updateData: Record<string, any> = {};
    // const updateData: Partial<Pick<User, "name" | "email" | "phone" | "tradingAmount" | "experience" | "role">> = {};


    // allowedFields.forEach((field) => {
    //   if (data[field] !== undefined) updateData[field] = data[field];
    // });

    const allowedFields = [
      "name",
      "email",
      "phone",
      "tradingAmount",
      "experience",
      "role",
    ] as const;
    
    type AllowedField = typeof allowedFields[number]; // "name" | "email" | ...
    
    const updateData: Partial<Pick<User, AllowedField>> = {};
    
    allowedFields.forEach((field) => {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    });
   
   
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("[PATCH_USER_PROFILE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
