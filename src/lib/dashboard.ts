// lib/dashboard.ts
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { isBefore } from "date-fns";

export async function getUserDashboardData() {
  const user = await getAuthUser();

  if (!user) return null;

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: user.id,
      active: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const botCount = await prisma.botActivation.count({
    where: {
      userId: user.id,
      active: true,
    },
  });

  const isExpired = subscription
    ? isBefore(new Date(subscription.expiresAt), new Date())
    : true;

  return {
    plan: subscription?.plan || null,
    expiresAt: subscription?.expiresAt || null,
    isExpired,
    botCount,
  };
}
