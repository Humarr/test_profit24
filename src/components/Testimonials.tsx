// components/Testimonials.tsx
import TweetCard from "./TweetCard";

const tweetsTopRow = [
  {
    username: "Jane Doe",
    handle: "janedoe",
    date: "May 10",
    content:
      "Profit24 bots have seriously transformed my trading game! Highly recommend for beginners and pros alike.",
  },
  {
    username: "Trader Joe",
    handle: "traderjoe",
    date: "May 12",
    content:
      "Automated bots with AI precision — the future of trading is here. Thanks, Profit24!",
  },
  {
    username: "Crypto Queen",
    handle: "cryptoqueen",
    date: "May 14",
    content:
      "The accuracy and ease of use are unmatched. My portfolio has never looked better.",
  },
];

const tweetsBottomRow = [
  {
    username: "Finance Guru",
    handle: "financeguru",
    date: "May 11",
    content:
      "Great platform with incredible support. The bots do the heavy lifting for me!",
  },
  {
    username: "Market Master",
    handle: "marketmaster",
    date: "May 13",
    content:
      "If you're serious about trading, Profit24 is the way to go. Automated and reliable.",
  },
  {
    username: "Investor X",
    handle: "investorx",
    date: "May 15",
    content:
      "Saw amazing returns with minimal effort. Love the UI and bot options.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16">
      {/* Small heading with light purple bg */}
      <div className="bg-brand-cream text-brand-purple text-sm font-semibold px-6 py-2 inline-block rounded-full mb-6">
        Testimonials
      </div>

      {/* Big main heading */}
      <h2 className="text-4xl font-bold mb-10 text-center text-brand-purple">
        You&#39;re in safe hands
      </h2>

      {/* Horizontal scroll container */}
      <div className="space-y-8 overflow-x-auto no-scrollbar px-6">
        {/* Top row */}
        <div className="flex space-x-6">
          {tweetsTopRow.map((tweet, i) => (
            <TweetCard key={i} {...tweet} />
          ))}
        </div>

        {/* Bottom row with horizontal offset */}
        <div className="flex space-x-6 translate-x-12">
          {tweetsBottomRow.map((tweet, i) => (
            <TweetCard key={i} {...tweet} />
          ))}
        </div>
      </div>
    </section>
  );
}
