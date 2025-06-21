import Link from 'next/link';
import { Bot, Stars } from 'lucide-react';
import Pricing from '@/components/Pricing';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export default async function DashboardPage() {
  const user = await getAuthUser();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto scrollbar-hide">
        {/* Promo Card */}
        <div className="relative bg-gradient-to-r from-brand-purple-500 to-brand-purple-600 rounded-xl p-8 mb-8 overflow-hidden shadow-2xl">
          <div className="absolute right-4 top-4">
            <Stars className="w-16 h-16 text-brand-purple-300 opacity-70" />
          </div>
          <div className="max-w-md">
            <h2 className="lg:text-3xl md:text-2xl text-xl font-bold font-sans text-slate-100 mb-2">
              Let Bots do the Trading, <br /> You reap the reward
            </h2>
            <p className="text-brand-purple-100 mb-6">Automated trading solutions for maximum profits</p>
            <Link
              href="/dashboard/offers"
              className="inline-block py-2 text-brand-cream-50 rounded-lg font-medium font-sans hover:text-brand-cream-100 transition"
            >
              Subscribe Now
            </Link>
          </div>
        </div>

        {/* Offers Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-0">
          <h2 className="text-2xl font-bold text-brand-slate-700 mb-4 md:mb-0">
            Subscribe to a plan to enjoy all that we have in stock
          </h2>
          <Link
            href="/dashboard/offers"
            className="hidden md:inline-block px-6 py-2 bg-brand-purple-600 text-white rounded-lg font-medium hover:bg-brand-purple-700 transition"
          >
            View all offers
          </Link>
        </div>

        {/* Pricing Component */}
        <Pricing external={true} />
      </div>
    );
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: user.id,
      active: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-7xl mx-auto scrollbar-hide">
      {/* Subscription Card */}
      <div className="bg-gradient-to-r from-brand-purple-50 to-brand-purple-100 rounded-xl p-6 mb-8 max-w-3xl">
        <h2 className="text-xl font-bold font-sans text-brand-slate-700 mb-4">Your subscription plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between md:justify-start md:gap-8">
            <div className="flex items-center gap-3 bg-brand-purple-500 p-3 rounded-lg border border-brand-cream-300">
              <Bot className="w-5 h-5 text-brand-purple-100" />
              <span className="font-medium font-sans text-brand-purple-100">
                {subscription?.plan ?? 'No Plan'}
              </span>
            </div>
            {subscription && (
              <div>
                <p className="text-sm font-medium font-sans text-brand-slate-500">Expires on</p>
                <p className="font-medium font-sans text-brand-slate-500">
                  {new Date(subscription.expiresAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bots Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h2 className="text-2xl font-bold text-brand-slate-700 mb-4 md:mb-0">
          Start copying the top performing bots
        </h2>
        <Link
          href="/dashboard/bots-lab"
          className="px-6 py-2 bg-brand-purple-600 text-white rounded-lg font-medium hover:bg-brand-purple-700 transition"
        >
          View all bots
        </Link>
      </div>

      {/* Static Bots Section (3 cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            className={`${
              id === 2 ? 'bg-brand-purple-500 text-white' : 'bg-brand-cream-100 text-brand-slate-700'
            } rounded-xl p-6 border border-brand-cream-300 shadow-sm`}
          >
            <h3 className="text-lg font-bold mb-2">BETA COPIER</h3>
            <a
              href="#"
              className={`text-sm ${
                id === 2 ? 'text-brand-cream-100' : 'text-brand-purple-600'
              } hover:underline mb-4 inline-block`}
            >
              Click to view bot information
            </a>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-sm">Min $1000 and above</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Overall: 112%</span>
                <span className="text-sm">Performance fee: 12%</span>
              </div>
            </div>
            <button className="w-full py-2 bg-brand-purple-600 text-white rounded-lg font-medium hover:bg-brand-purple-700 transition">
              START COPYING
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
