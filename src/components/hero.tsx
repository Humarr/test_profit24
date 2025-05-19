// components/Hero.tsx
import Link from "next/link";

export default function Hero() {
    return (
        <header className="w-full bg-white text-center px-6 py-20" id="home">
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-brand-purple mb-6 max-w-2xl mx-auto">
                Maximum Market Gains With Our Automated Bots
            </h1>
            <p className="text-base md:text-lg text-brand-slate mb-8 max-w-2xl mx-auto font-sans">
                Harness the power of AI-driven trading strategies. Copy top-performing bots and maximize your market potential with precision and ease.
            </p>
            <Link
                href="#signup"
                aria-label="Get started with Profit24"
                className="bg-brand-purple text-white hover:bg-brand-purple-dark px-6 py-3 rounded-xl font-sans text-xs md:text-sm lg:text-base shadow-lg transition duration-300 ease-in-out inline-block"
            >
                Get Started
            </Link>
        </header>
    );
}
