// components/Hero.tsx
import { Stars } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  
  return (
    <header
      className="relative w-full bg-brand-white px-6 py-20 overflow-hidden text-center"
      id="home"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/illustrations/pattern.jpeg"
          alt="Background pattern"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-50 pointer-events-none select-none"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-50 z-10" />

      {/* Radial Glow (Edge focus) */}
      {/* <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.7)_0%,_transparent_70%)]" />
      </div> */}

      {/* Content */}
      <div className="relative z-30 max-w-3xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="bg-brand-purple-100 text-brand-white p-2 rounded-full flex items-center gap-2 justify-center mb-4 max-w-full sm:max-w-fit shadow-sm">
          <Stars className="text-brand-purple-500" size={14} />
          <span className="text-brand-purple-500 font-sans font-medium text-xs text-center">
            Hands Free Trading. No Stress. Consistent Results.
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-sans font-bold text-brand-purple-500 mb-6 max-w-2xl drop-shadow-md">
          The Power of A Hedge Fund In Your Pocket
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-brand-slate-500 mb-8 max-w-xl font-sans drop-shadow-sm">
          {/* Harness the power of AI-driven trading strategies. Copy
          top-performing bots and maximize your market potential with
          precision and ease. */}
          Now is the time to use an advanced, AI-powered forex trading system built to analyse the market and generate consistent profits for you.

        </p>

        {/* CTA */}
        <Link
          href="/auth/register"
          aria-label="Get started with Profit24"
          className="bg-brand-purple-500 text-brand-white hover:bg-brand-purple-600 px-6 py-3 rounded-xl font-sans text-sm md:text-md lg:text-lg shadow-lg transition duration-300 ease-in-out inline-block"
        >
          Get Started
        </Link>

        {/* Illustration (moved to bottom) */}
        <div className="mt-12 w-full max-w-md mx-auto">
          <Image
            src="/illustrations/hero.png"
            alt="Hero illustration"
            width={500}
            height={500}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </header>
  );
}
