// app/user/settings/page.tsx
"use client";
import React from "react";
import ProfileInfoCard from "@/components/settings/ProfileInfoCard";
import ReferralInfoCard from "@/components/settings/ReferralInfoCard";
import SubscriptionInfoCard from "@/components/settings/SubscriptionInfoCard";
import SecurityCard from "@/components/settings/SecurityCard";
// import NotificationPreferencesCard from "@/components/settings/NotificationPreferencesCard";
import {DangerZoneCard} from "@/components/settings/DangerZoneCard";
import { useParams } from "next/navigation";

export default function UserSettingsPage() {
    const params = useParams(); // ✅ Not a promise
    const id = params?.id as string;
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-brand-slate-800 mb-4">Account Settings</h1>

      <ProfileInfoCard />
      <ReferralInfoCard />
      <SubscriptionInfoCard />
      <SecurityCard />
      {/* <NotificationPreferencesCard /> */}
      <DangerZoneCard userId={id}/>
    </div>
  );
}
