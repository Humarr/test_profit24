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

// const mockTweets: Tweet[] = Array.from({ length: 10 }, (_, i) => ({
//   username: `User ${i + 1}`,
//   handle: `user${i + 1}`,
//   date: `May ${10 + i}`,
//   content: `This is a sample testimonial tweet number ${
//     i + 1
//   } praising the product for its usefulness.`,
//   avatarUrl: `https://randomuser.me/api/portraits/${
//     i % 2 === 0 ? "men" : "women"
//   }/${i + 10}.jpg`,
// }));


const mockTweets: Tweet[] = [
  {
    username: "Chinedu Okafor",
    handle: "chinedu_trades",
    date: "May 10",
    content: "Profit24 has changed the game for me. I went from guessing trades to consistent daily profits!",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    username: "Aisha Bello",
    handle: "aisha_fxqueen",
    date: "May 11",
    content: "I was skeptical at first, but the bots really work. I’ve already made back my investment.",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    username: "Tunde Bakare",
    handle: "tunde_bk",
    date: "May 12",
    content: "As someone with zero trading experience, I’m surprised how easy Profit24 is to use.",
    avatarUrl: "https://randomuser.me/api/portraits/men/28.jpg",
  },
  {
    username: "Ngozi Eze",
    handle: "ngozi_trader",
    date: "May 13",
    content: "Solid platform. Transparent bots and reliable support. I love it.",
    avatarUrl: "https://randomuser.me/api/portraits/women/36.jpg",
  },
  {
    username: "Emeka Nwankwo",
    handle: "emeka_fx",
    date: "May 14",
    content: "Profit24 helped me recover from months of trading losses. Highly recommended.",
    avatarUrl: "https://randomuser.me/api/portraits/men/39.jpg",
  },
  {
    username: "Halima Yusuf",
    handle: "halima_yu",
    date: "May 15",
    content: "I’ve tried other bots before. None come close to Profit24. The results are real.",
    avatarUrl: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    username: "Joseph Abah",
    handle: "joseph_abah",
    date: "May 16",
    content: "Finally something legit. It’s been 3 weeks of steady growth in my account.",
    avatarUrl: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    username: "Blessing Udoh",
    handle: "bless_udoh",
    date: "May 17",
    content: "Customer service is top-notch. They walked me through everything step by step.",
    avatarUrl: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    username: "Uche Anozie",
    handle: "ucheanozie",
    date: "May 18",
    content: "I love the automation. I wake up and see profits already made. Zero stress.",
    avatarUrl: "https://randomuser.me/api/portraits/men/47.jpg",
  },
  {
    username: "Kemi Adeyemi",
    handle: "kemi_fxpro",
    date: "May 19",
    content: "Was referred by a friend. Now I’m referring others. This platform actually delivers.",
    avatarUrl: "https://randomuser.me/api/portraits/women/40.jpg",
  },
];


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
