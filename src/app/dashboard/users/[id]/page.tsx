"use client"
import UserBasicInfoCard from "@/components/user/UserBasicInfoCard";
import ReferralInfoCard from "@/components/user/ReferralInfo";
import SubscriptionsList from "@/components/user/SubscriptionsList";
import BotActivationsList from "@/components/user/BotActivationsList";
import TransactionsList from "@/components/user/TransactionsList";
import { useCallback, useEffect, useState } from "react";
import { User } from "@/app/api/user/[id]/route";
import { useParams } from "next/navigation";
import Spinner from "@/components/Spinner";
import { useToast } from "@/components/toast/useToast";




export default function UserProfilePage() {
  const params = useParams(); // ✅ Not a promise
  const id = params?.id as string;
  // const session = await getServerSession(authOptions);
  const [user, setUser] = useState<User>(
     {
      id: "",
      name: "",
      email: "",
      phone: "",
      tradingAmount: "",
      experience: "",
      role: "",
      createdAt: new Date(),
      myReferralCode: "",
      referredBy: null,
      referredUsers: [],
      subscriptions: [],
      activations: [],
      transactions: [],
     }
  );

  const [loading, setLoading] = useState(false)

  const toast = useToast();

  const getUserById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();
      setUser(data.user); // assuming response has a `user` key
      return data.user;
    } catch (error) {
      toast("Failed to fetch user: " + error, 'error');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    getUserById(id);
  }, [id, getUserById]);


  if (loading)
    return <Spinner/>

if (!user)
  return <div>user not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-brand-slate-700">User Profile</h1>

      <UserBasicInfoCard user={user} />

      <ReferralInfoCard user={user} />

      <SubscriptionsList subscriptions={user?.subscriptions} />

      <BotActivationsList activations={user?.activations} />

      <TransactionsList transactions={user?.transactions} />
    </div>
  );
}
