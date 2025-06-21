"use client";

import useSubscriptionStatus from "@/hooks/useSubscriptionStatus";
import { useRouter } from "next/navigation";
import { useActivateBot } from "@/hooks/useActivateBot";
import BotModal from "@/components/BotModal";
import { Bot, bots } from "@/data/bots";
import { useState } from "react";
// type Bot = {
//   id: string
//   name: string
//   minAmount: string
//   performance: string
//   fee: string
//   bgColor: string
// }

export default function BotsLabPage() {
  const { loading, active } = useSubscriptionStatus();
  const router = useRouter();

  const activateBot = useActivateBot();

  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

  const handleStartCopying = async (botId: string, botName: string) => {
    if (loading) return;

    if (!active) {
      return router.push("/dashboard/offers");
    }

    const success = await activateBot(botId);

    if (success) {
      const encodedMessage = encodeURIComponent(
        `Hi! I’d like to activate the bot: ${botName}`
      );
      router.push(`https://wa.me/234XXXXXXXXXX?text=${encodedMessage}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto scrollbar-hide">
      <h1 className="text-3xl font-bold text-brand-slate-700 mb-8">BOTS LAB</h1>

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
      <BotModal bot={selectedBot} onClose={() => setSelectedBot(null)} />
    </div>
  );
}
