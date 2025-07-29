'use client'

import { Bot } from "@/data/bots";
import { useEffect, useState } from "react";
// import { ENDPOINT_URL } from "../../../endpoint";

function ActivatedBots() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivatedBots = async () => {
      try {
        const res = await fetch(`/api/user/activated-bots`, {
          method: 'GET',
          // cache: 'no-store', // ensure it's always fresh
          credentials: 'include'
        });
        const data = await res.json();
        setBots(data.bots || []);
      } catch (err) {
        const error = err as Error;
        console.error('Failed to load activated bots', error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivatedBots();
  }, []);

  if (loading) {
    return <p className="text-brand-slate-500">Loading activated bots...</p>;
  }

  if (bots.length === 0) {
    return <p className="text-brand-slate-500">You haven’t activated any bots yet.</p>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-brand-slate-700 mb-4">
        Your Active Bots
      </h3>
      <ul className="space-y-3">
        {bots.map((bot) => (
          <li
            key={bot.id}
            className="p-4 rounded-lg bg-brand-cream-100 border border-brand-cream-300 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-brand-slate-700">{bot.name}</p>
                <p className="text-sm text-brand-slate-500">{bot.description}</p>
              </div>
              <span className="text-sm text-brand-purple-600 font-semibold">
                {bot.performance}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivatedBots;
