"use client";

import useSubscriptionStatus from "@/hooks/useSubscriptionStatus";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/toast/useToast";
import BotModal from "@/components/BotModal";
import { Bot } from "@/data/bots";



export default function BotsLabPage() {
  const { loading, active } = useSubscriptionStatus();
  const router = useRouter();
  const addToast = useToast();

  const [bots, setBots] = useState<Bot[]>([]);
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const res = await fetch("/api/dashboard/bots/all");
        // console.log(res)
        const data = await res.json();
        console.log(data)
        setBots(data.bots);
      } catch (err) {
        const error  = err as Error;
        console.log(error)
        addToast(error.message, "error");
      } finally {
        setFetching(false);
      }
    };
    fetchBots();
  }, [addToast]);

  const handleStartCopying = async (botId: string, botName: string) => {
    if (loading) return;

    if (!active) {
      return router.push("/dashboard/offers");
    }

    try {
      const res = await fetch("/api/user/activate-bot", {
        method: "POST",
        body: JSON.stringify({ botId }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      addToast(`${botName} activated!`, "success");
    } catch (err) {
      const error = err as Error;
      addToast(error.message, "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto scrollbar-hide">
      <h1 className="text-3xl font-bold text-brand-slate-700 mb-8">BOTS LAB</h1>

      {fetching ? (
        <p className="text-brand-slate-500">Loading bots...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map((bot) => (
            <div
              key={bot.id}
              className={`${bot.bgColor} rounded-xl p-6 border border-brand-cream-300 shadow-sm hover:shadow-md transition-shadow`}
            >
              <h3 className="text-lg font-bold text-brand-slate-700 mb-2">
                {bot.name}
              </h3>
              <button
                onClick={() => setSelectedBot(bot)}
                className="text-sm text-brand-purple-600 hover:underline mb-4 inline-block cursor-pointer"
              >
                Click to view bot information
              </button>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-brand-slate-500">
                    Min {bot.minAmount} and above
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-brand-slate-500">
                    Overall: {bot.performance}
                  </span>
                  <span className="text-sm text-brand-slate-500">
                    Performance fee: {bot.fee}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleStartCopying(bot.id, bot.name)}
                disabled={loading}
                className="w-full py-2 bg-brand-purple-600 text-white rounded-lg font-medium hover:bg-brand-purple-700 transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Checking..." : "START COPYING"}
              </button>
            </div>
          ))}
        </div>
      )}

      <BotModal bot={selectedBot} onClose={() => setSelectedBot(null)} />
    </div>
  );
}
