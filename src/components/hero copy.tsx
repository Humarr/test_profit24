// components/Hero.tsx
import { Stars } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <header
            className="w-full bg-brand-white text-center px-6 py-20"
            id="home"
        >
          <div className="w-full flex justify-center">
  <div className="bg-brand-purple-100 text-brand-white p-2 rounded-full flex items-center gap-2 justify-center mb-4 max-w-full sm:max-w-fit">
    <Stars className="text-brand-purple-500" size={14} />
    <span className="text-brand-purple-500 font-sans font-medium text-xs text-center">
      Hands Free Trading. No Stress. Consistent Results.
    </span>
  </div>
</div>

            <h1 className="text-4xl md:text-5xl font-sans font-bold text-brand-purple-500 mb-6 max-w-2xl mx-auto">
                The Power of A Hedge Fund In Your Pocket
            </h1>
            <p className="text-base md:text-lg text-brand-slate-500 mb-8 max-w-2xl mx-auto font-sans">
                Harness the power of AI-driven trading strategies. Copy top-performing bots and maximize your market potential with precision and ease.
            </p>
            <Link
                href="#signup"
                aria-label="Get started with Profit24"
                className="bg-brand-purple-500 text-brand-white hover:bg-brand-purple-600 px-6 py-3 rounded-xl font-sans text-sm md:text-md lg:text-lg shadow-lg transition duration-300 ease-in-out inline-block"
            >
                Get Started
            </Link>
        </header>
    );
}
