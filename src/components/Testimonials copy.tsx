'use client';
import Image from 'next/image';
import React from 'react';

interface Tweet {
  username: string;
  handle: string;
  date: string;
  content: string;
  avatarUrl: string;
}

function TweetCard({ username, handle, date, content, avatarUrl }: Tweet) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full h-full">
      <div className="flex items-center gap-3 mb-3">
        <Image src={avatarUrl} alt={username} width={40} height={40} className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-bold text-sm text-brand-slate-700">{username}</p>
          <p className="text-xs text-brand-slate-400">@{handle} · {date}</p>
        </div>
      </div>
      <p className="text-sm text-brand-slate-600">{content}</p>
    </div>
  );
}

const mockTweets: Tweet[] = Array.from({ length: 10 }, (_, i) => ({
  username: `User ${i + 1}`,
  handle: `user${i + 1}`,
  date: `May ${10 + i}`,
  content: `This is a sample testimonial tweet number ${i + 1} praising the product for its usefulness.`,
  avatarUrl: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 10}.jpg`
}));

export default function Testimonials() {
  const topRow = mockTweets;
  const bottomRow = mockTweets.map((t, i) => ({
    ...t,
    username: `AltUser ${i + 1}`,
    handle: `altuser${i + 1}`,
    date: `May ${20 + i}`,
  }));

  return (
    <section className="py-16 bg-brand-cream-100">
      <div className="flex justify-center mb-6">
        <div className="bg-brand-purple-100 text-brand-purple-500 text-sm font-semibold font-sans px-6 py-2 rounded-full">
          Testimonials
        </div>
      </div>

      <h2 className="text-4xl font-bold mb-10 text-center text-brand-slate-500">
        <span className="hidden md:inline-block">Winning Trades. Happy Traders.</span>
        <span className="md:hidden">You&apos;re in safe hands</span>
      </h2>

      {/* Top Row */}
      <div className="relative w-full overflow-x-auto scroll-smooth">
        <div
          className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]"
          style={{ animationDuration: '60s' }}
        >
          {[...topRow, ...topRow].map((tweet, i) => (
            <div key={`top-${i}`} className="w-[280px] md:w-[320px] flex-shrink-0">
              <TweetCard {...tweet} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="relative w-full overflow-x-auto scroll-smooth mt-10">
        <div
          className="flex w-max animate-marquee-reverse gap-6 hover:[animation-play-state:paused]"
          style={{ animationDuration: '90s' }}
        >
          {[...bottomRow, ...bottomRow].map((tweet, i) => (
            <div key={`bottom-${i}`} className="w-[280px] md:w-[320px] flex-shrink-0">
              <TweetCard {...tweet} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
