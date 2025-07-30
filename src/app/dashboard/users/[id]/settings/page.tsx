// app/user/settings/page.tsx
"use client";
import ProfileInfoCard from "@/components/settings/ProfileInfoCard";
import ReferralInfoCard from "@/components/settings/ReferralInfoCard";
import SecurityCard from "@/components/settings/SecurityCard";
import SubscriptionInfoCard from "@/components/settings/SubscriptionInfoCard";
// import NotificationPreferencesCard from "@/components/settings/NotificationPreferencesCard";
import { DangerZoneCard } from "@/components/settings/DangerZoneCard";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
    name: string;
    id: string;
    email: string;
    phone: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export default function UserSettingsPage() {
    const params = useParams(); // ✅ Not a promise
    const id = params?.id as string;
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getCurrentUser();
                setUser(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [id]);
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-brand-slate-800 mb-4">Account Settings</h1>

      <ProfileInfoCard />
      <ReferralInfoCard />
      <SubscriptionInfoCard />
      <SecurityCard />
      {/* <NotificationPreferencesCard /> */}
      {user?.role === "admin" && <DangerZoneCard userId={id}/>}
    </div>
  );
}
