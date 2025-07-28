// WhyUs.tsx
import React from 'react';
import {
  Activity,
  TrendingUp,
  Smartphone,
  Clock,
//   UserCheck,
//   Headphones,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';

export default function WhyUs() {


  const features = [
    {
      Icon: Activity,
      title: 'Fully Automated Trading',
      description:
        'Our system does the heavy lifting. You set it once, and it works in the background 24/7, finding and executing winning trades.',
    },
    {
      Icon: TrendingUp,
      title: 'Consistent Daily Results',
      description:
        'Forget rollercoaster trading. Profit24 is built to help you earn steadily, not occasionally.',
    },
    {
      Icon: Smartphone,
      title: 'Built for Simplicity',
      description:
        'No jargon, no complexity. If you can use a smartphone, you can use Profit24.',
    },
    {
      Icon: Clock,
      title: 'Made for People Who Value Time',
      description:
        'You’ve got better things to do than stare at screens. We help you grow your portfolio while living your life.',
    },
  ];

  const beforeAfter = [
    {
      before: 'Hours wasted on confusing charts and analysis',
      after: 'Profit24 Scalper scans the market and finds the best trades automatically',
    },
    {
      before: 'Emotional decisions ruin your results',
      after: 'Runs on proven, emotion‑free trading strategies',
    },
    {
      before: 'Constant stress during volatile news cycles',
      after: 'Expert traders step in to manage volatility when needed',
    },
    {
      before: 'You trade. You lose. You doubt yourself.',
      after: 'The bot trades 24/7 even while you sleep, delivering consistent wins',
    },
    {
      before: 'No support. You’re on your own.',
      after: '24/7 support and a system that actually works for you',
    },
  ];

//   const plans = [
//     {
//       Icon: UserCheck,
//       name: 'Standard Plan',
//       description: 'Perfect for beginners who want a simple, guided way to start trading with automation.',
//       minCapital: '$500',
//       subscription: '$49/month',
//       features: ['24/7 Customer Support', 'Optimized Risk Strategy'],
//     },
//     {
//       Icon: Headphones,
//       name: 'Special Package',
//       description: 'Ideal for those who want hands‑on support and smarter strategies with moderate capital.',
//       minCapital: '$1,000',
//       subscription: '$39/month',
//       features: ['1‑on‑1 Customer Support', '24/7 Access to Technical Team', 'Optimized Risk Strategy'],
//     },
//     {
//       Icon: UserCheck,
//       name: 'Investor Package',
//       description: 'Best suited for serious investors looking for deeper support, lower fees, and maximum performance.',
//       minCapital: '$3,000',
//       subscription: '$29/month',
//       features: ['Dedicated 1‑on‑1 Support', 'Direct Call Access to Technical Team (24/7)', 'Optimized Risk Strategy'],
//     },
//   ];

  return (
    <section className="w-full px-4 sm:px-6 mb-20 mt-8 bg-white" id="bots">
      <div className="text-center mt-16 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-slate-500 font-sans mb-4">
          Why Choose Profit24 Scalper?
        </h2>
        <p className="text-brand-slate-500 text-lg font-sans">
          Here’s why traders both beginners and busy professionals choose us:
        </p>
      </div>

      {/* Feature Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {features.map(({ Icon, title, description }, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-6 rounded-lg shadow-md bg-brand-purple-50 text-brand-slate-700 hover:shadow-lg transition"
          >
            <Icon size={32} className="flex-shrink-0 text-brand-purple-500" />
            <div>
              <h3 className="text-xl font-semibold font-sans">{title}</h3>
              <p className="mt-2 leading-relaxed font-sans">{description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Before vs After */}
     


<div className="max-w-6xl mx-auto mt-24">
  <h3 className="text-2xl font-bold text-center text-brand-slate-500 mb-10">
    Your Trading Life: Before vs. After Profit24 Scalper
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {beforeAfter.map(({ before, after }, index) => (
      <div
        key={index}
        className="flex gap-4 bg-brand-cream-50 rounded-xl shadow-sm p-6 hover:shadow-md transition"
      >
        <div className="w-1/2 pr-4 border-r border-brand-cream-200">
          <div className="flex items-center text-brand-orange-500 font-semibold mb-2">
            <ThumbsDown size={20} className="mr-2" />
            <span>Before</span>
          </div>
          <p className="text-brand-slate-700">{before}</p>
        </div>
        <div className="w-1/2 pl-4">
          <div className="flex items-center text-green-600 font-semibold mb-2">
            <ThumbsUp size={20} className="mr-2" />
            <span>After</span>
          </div>
          <p className="text-brand-slate-700">{after}</p>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* Plans */}
      {/* <div className="max-w-6xl mx-auto mt-24">
        <h3 className="text-2xl font-bold text-center text-brand-slate-500 mb-10">
          Choose your plan and start trading today
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(({ Icon, name, description, minCapital, subscription, features }, idx) => (
            <div
              key={idx}
              className="bg-brand-purple-500 text-brand-white p-6 rounded-2xl shadow-xl flex flex-col justify-between hover:scale-105 transform transition"
            >
              <div>
                <Icon size={36} className="mb-4" />
                <h4 className="text-2xl font-bold mb-2">{name}</h4>
                <p className="mb-4 font-sans">{description}</p>
                <p className="font-semibold mb-1">Minimum Capital: {minCapital}</p>
                <p className="font-semibold mb-4">Subscription: {subscription}</p>
                <ul className="space-y-2 text-sm">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-white rounded-full mr-2" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="mt-6 bg-brand-white text-brand-purple-600 font-semibold py-3 rounded-md hover:bg-brand-cream-100 transition">
                Activate Plan
              </button>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
}
