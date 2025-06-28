"use client";

import useSubscriptionStatus from "@/hooks/useSubscriptionStatus";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/toast/useToast";
import BotModal from "@/components/BotModal";
import { Bot } from "@/data/bots";
import Spinner from "@/components/Spinner";

export default function BotsLabPage() {
  const { loading, active } = useSubscriptionStatus();
  const router = useRouter();
  const addToast = useToast();

  const [bots, setBots] = useState<Bot[]>([]);
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [fetching, setFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const res = await fetch("/api/dashboard/bots/all");
        const data = await res.json();
        setBots(data.bots);
        console.log("Bots: ", data.bots)
      } catch (err) {
        const error = err as Error;
        console.error(error);
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
      
      if (res.status === 403) {
        // No active subscription → redirect client-side
        router.push('/dashboard/offers');
        return;
      }
      if (!res.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      addToast(`${botName} activated!`, "success");
    } catch (err) {
      const error = err as Error;
      addToast(error.message, "error");
    }
  };

  const filteredBots = bots.filter((bot) =>
    bot.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto scrollbar-hide">
      <h1 className="text-3xl font-bold text-brand-slate-700 mb-8">BOTS LAB</h1>

      {/* Search Input */}
      {!fetching && bots.length > 0 && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search bots..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-2 border border-brand-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple-500 placeholder:text-brand-slate-400 placeholder:font-medium text-brand-slate-700 font-medium bg-brand-slate-50/50"
          />
        </div>
      )}

      {fetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-brand-cream-100 p-6 rounded-xl border border-brand-cream-300 shadow-sm"
            >
              <div className="h-6 bg-brand-cream-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-brand-cream-300 rounded w-1/2 mb-6"></div>
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-brand-cream-300 rounded w-full"></div>
                <div className="h-4 bg-brand-cream-300 rounded w-full"></div>
              </div>
              <div className="h-10 bg-brand-cream-300 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : filteredBots.length === 0 ? (
        <p className="text-brand-slate-500">No bots found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBots.map((bot) => (
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
