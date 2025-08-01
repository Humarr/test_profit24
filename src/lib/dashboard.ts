// // lib/dashboard.ts

import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { isBefore } from "date-fns";
import { cookies } from "next/headers";

type DashboardData =
  | {
      success: true;
      data: {
        plan: string | null;
        expiresAt: Date | null;
        isExpired: boolean;
        botCount: number;
      };
    }
  | {
      success: false;
      error: string;
    };

export async function getUserDashboardData(): Promise<DashboardData> {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    return {
      success: false,
      error: "Missing auth token",
    };
  }

  try {
    const user = await getAuthUser();
    if (!user) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

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
      success: true,
      data: {
        plan: subscription?.plan || null,
        expiresAt: subscription?.expiresAt || null,
        isExpired,
        botCount,
      },
    };
  } catch (error) {
    console.error("Failed to fetch user dashboard data:", error);
    return {
      success: false,
      error: (error as Error).message || "Unknown error",
    };
  }
}








// import prisma from "@/lib/prisma";
// import { getAuthUser } from "@/lib/auth";
// import { isBefore } from "date-fns";
// import { cookies } from "next/headers";
// // import { ENDPOINT_URL } from "../../endpoint";

// export async function getUserDashboardData() {

//   const token = (await cookies()).get('auth_token')?.value;

//   if (!token) return null;

//   try {
//   //   const response = await fetch(`${ENDPOINT_URL}/api/user/dashboard`, {
//   //     method: 'GET',
//   //     headers: {
//   //       'Authorization': `Bearer ${token}`,
//   //     },
//   //     // cache: 'no-store', // ensure it's always fresh
//   //     credentials: 'include'
//   //   });

//   //   if (!response.ok) {
//   //     return null;
//   //   }

//   //   const data = await response.json();
//   //   return data;
//   // } catch (error) {
//   //   console.error('Failed to fetch user dashboard data:', error);
//   //   return (error as Error).message || null;
//   // }

//   const user = await getAuthUser();

//   if (!user) return null;

//   const subscription = await prisma.subscription.findFirst({
//     where: {
//       userId: user.id,
//       active: true,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   const botCount = await prisma.botActivation.count({
//     where: {
//       userId: user.id,
//       active: true,
//     },
//   });

//   const isExpired = subscription
//     ? isBefore(new Date(subscription.expiresAt), new Date())
//     : true;

//   return {
//     plan: subscription?.plan || null,
//     expiresAt: subscription?.expiresAt || null,
//     isExpired,
//     botCount,
//   };
// } catch (error) {
//   console.error('Failed to fetch user dashboard data:', error);
//   return (error as Error).message || null;
// }
// }
