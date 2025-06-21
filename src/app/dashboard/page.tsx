import Pricing from '@/components/Pricing'
import { Bot, Stars } from 'lucide-react'
import Link from 'next/link'
// import Pricing from '@/components/pricing'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function DashboardPage() {
  const isLoggedIn = true // This would come from your auth system

  const session = await getServerSession(authOptions);

  if (!isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto scrollbar-hide">
    
        {/* Promo Card */}
        <div className="relative bg-gradient-to-r from-brand-purple-500 to-brand-purple-600 rounded-xl p-8 mb-8 overflow-hidden shadow-2xl">
          {/* Twinkling stars */}
          <div className="absolute right-4 top-4">
            <Stars className="w-16 h-16 text-brand-purple-300 opacity-70" />
          </div>
          
          <div className="max-w-md">
            <h2 className="lg:text-3xl md:text-2xl text-xl font-bold font-sans text-slate-100 mb-2">
              Let Bots do the Trading, <br />
              You reap the reward
            </h2>
            <p className="text-brand-purple-100 mb-6">Automated trading solutions for maximum profits</p>
            <Link
              href="/dashboard/offers"
              className="inline-block py-2 text-brand-cream-50 rounded-lg  font-medium font-sans hover:text-brand-cream-100 transition"
            >
              Subscribe Now
            </Link>
          </div>
        </div>

        {/* Offers Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
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
        <Pricing />
      </div>
    )
  }

  // Logged in state will be implemented next
    // Logged in state
    return (
      <div className="max-w-7xl mx-auto scrollbar-hide">
             <pre className="mt-4 bg-gray-100 p-4 rounded text-black">
        {JSON.stringify(session, null, 2)}
      </pre>
        {/* Subscription Card */}
        <div className="bg-gradient-to-r from-brand-purple-50 to-brand-purple-100 rounded-xl p-6 mb-8 max-w-3xl">
          <h2 className="text-xl font-bold font-sans text-brand-slate-700 mb-4">Your subscription plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between md:justify-start md:gap-8">
            <div className="flex items-center gap-3 bg-brand-purple-500 p-3 rounded-lg border border-brand-cream-300">
              <Bot className="w-5 h-5 text-brand-purple-100" />
              <span className="font-medium font-sans text-brand-purple-100">Premium Plan</span>
            </div>
              <div>
                <p className="text-sm font-medium font-sans text-brand-slate-500">No of bots</p>
                <p className="font-medium font-sans text-brand-slate-500">5</p>
              </div>
              {/* <div>
                <p className="text-sm text-brand-slate-500">Expires on</p>
                <p className="font-medium font-sans text-brand-purple-100">Jan 15, 2024</p>
              </div> */}
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
  
        {/* Bots Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bot Card 1 */}
          <div className="bg-brand-cream-100 rounded-xl p-6 border border-brand-cream-300 shadow-sm">
            <h3 className="text-lg font-bold text-brand-slate-700 mb-2">BETA COPIER</h3>
            <a href="#" className="text-sm text-brand-purple-600 hover:underline mb-4 inline-block">
              Click to view bot information
            </a>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-sm text-brand-slate-500">Min $500 and above</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-brand-slate-500">Overall: 112%</span>
                <span className="text-sm text-brand-slate-500">Performance fee: 12%</span>
              </div>
            </div>
            <button className="w-full py-2 bg-brand-purple-600 text-white rounded-lg font-medium hover:bg-brand-purple-700 transition">
              START COPYING
            </button>
          </div>
  
          {/* Bot Card 2 */}
          <div className="bg-brand-purple-500 rounded-xl p-6 border border-brand-purple-100 shadow-sm">
            <h3 className="text-lg font-bold text-brand-cream-100 mb-2">BETA COPIER</h3>
            <a href="#" className="text-sm text-brand-cream-100 hover:underline mb-4 inline-block">
              Click to view bot information
            </a>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-sm text-brand-cream-100">Min $1000 and above</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-brand-cream-100">Overall: 112%</span>
                <span className="text-sm text-brand-cream-100">Performance fee: 12%</span>
              </div>
            </div>
            <button className="w-full py-2 bg-brand-purple-400 text-white rounded-lg font-medium hover:bg-brand-purple-300 transition">
              START COPYING
            </button>
          </div>
  
          {/* Bot Card 3 */}
          <div className="bg-brand-cream-100 rounded-xl p-6 border border-brand-cream-300 shadow-sm">
            <h3 className="text-lg font-bold text-brand-slate-700 mb-2">BETA COPIER</h3>
            <a href="#" className="text-sm text-brand-purple-600 hover:underline mb-4 inline-block">
              Click to view bot information
            </a>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-sm text-brand-slate-500">Min $1000 and above</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-brand-slate-500">Overall: 112%</span>
                <span className="text-sm text-brand-slate-500">Performance fee: 12%</span>
              </div>
            </div>
            <button className="w-full py-2 bg-brand-purple-600 text-white rounded-lg font-medium hover:bg-brand-purple-700 transition">
              START COPYING
            </button>
          </div>
        </div>
      </div>
    )
}