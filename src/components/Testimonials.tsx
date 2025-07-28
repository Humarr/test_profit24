"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface Tweet {
  username: string;
  handle: string;
  date: string;
  content: string;
  avatarUrl: string;
}

const mockTweets: Tweet[] = Array.from({ length: 10 }, (_, i) => ({
  username: `User ${i + 1}`,
  handle: `user${i + 1}`,
  date: `May ${10 + i}`,
  content: `This is a sample testimonial tweet number ${
    i + 1
  } praising the product for its usefulness.`,
  avatarUrl: `https://randomuser.me/api/portraits/${
    i % 2 === 0 ? "men" : "women"
  }/${i + 10}.jpg`,
}));

export default function Testimonials() {
  console.log("rendering Testimonials component");
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;

    let topInterval: NodeJS.Timeout;
    let bottomInterval: NodeJS.Timeout;

    const scrollContent = (container: HTMLDivElement, speed: number) => {
      return setInterval(() => {
        if (!container) return;
        container.scrollLeft += 1;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }, speed);
    };

    const startAutoScroll = () => {
      if (topRow && bottomRow) {
        topInterval = scrollContent(topRow, 20);
        bottomInterval = scrollContent(bottomRow, 30);
      }
    };

    const stopAutoScroll = () => {
      clearInterval(topInterval);
      clearInterval(bottomInterval);
    };

    const attachEvents = (el: HTMLDivElement) => {
      el.addEventListener("mouseenter", stopAutoScroll);
      el.addEventListener("mouseleave", startAutoScroll);
      el.addEventListener("touchstart", stopAutoScroll);
      el.addEventListener("touchend", startAutoScroll);
    };

    if (topRow && bottomRow) {
      attachEvents(topRow);
      attachEvents(bottomRow);
      startAutoScroll();
    }

    return () => {
      stopAutoScroll();
    };
  }, []);

  return (
    <section
      id="testimonials"
      className="py-16 bg-brand-cream-100 overflow-hidden"
    >
      {/* Centered Testimonials label */}
      <div className="flex justify-center mb-6">
        <div className="bg-brand-purple-100 text-brand-purple-500 text-sm font-semibold font-sans px-6 py-2 rounded-full">
          Testimonials
        </div>
      </div>

      <h2 className="text-4xl font-bold mb-10 text-center text-brand-slate-500">
        <span className="hidden md:inline">Winning Trades. Happy Traders.</span>
        <span className="md:hidden">
          These are the results our users are getting day after day:
        </span>
      </h2>

      {/* Top Row (No scroll-smooth) */}
      <div
        ref={topRowRef}
        className="w-full overflow-x-auto flex gap-6 scrollbar-hide"
      >
        {[...mockTweets, ...mockTweets].map((tweet, i) => (
          <div
            key={`top-${i}`}
            className="w-[280px] md:w-[320px] flex-shrink-0 snap-center"
          >
            <TweetCard {...tweet} />
          </div>
        ))}
      </div>

      {/* Bottom Row (No scroll-smooth) */}
      <div
        ref={bottomRowRef}
        className="w-full overflow-x-auto flex gap-6 scrollbar-hide mt-10"
      >
        {[...mockTweets, ...mockTweets].map((tweet, i) => (
          <div
            key={`bottom-${i}`}
            className="w-[280px] md:w-[320px] flex-shrink-0 snap-center"
          >
            <TweetCard {...tweet} />
          </div>
        ))}
      </div>
    </section>
  );
}

function TweetCard({ username, handle, date, content, avatarUrl }: Tweet) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full h-full">
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={avatarUrl}
          alt={username}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-bold text-sm text-brand-slate-700">{username}</p>
          <p className="text-xs text-brand-slate-400">
            @{handle} · {date}
          </p>
        </div>
      </div>
      <p className="text-sm text-brand-slate-600">{content}</p>
    </div>
  );
}
