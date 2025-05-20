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
            <div className="flex justify-center mb-6">
                <div className="bg-brand-cream text-brand-purple text-sm font-semibold px-6 py-2 rounded-full">
                    Testimonials
                </div>
            </div>


            {/* Big main heading */}
            <h2 className="text-4xl font-bold mb-10 text-center text-brand-purple">
                You&#39;re in safe hands
            </h2>

            {/* Responsive testimonial rows */}
            <div className="space-y-8 px-6">
                {/* Top row */}
                <div className="flex flex-col md:flex-row md:space-x-6 md:overflow-x-auto md:no-scrollbar md:px-0 space-y-6 md:space-y-0">
                    {tweetsTopRow.map((tweet, i) => (
                        <TweetCard key={i} {...tweet} />
                    ))}
                </div>

                {/* Bottom row */}
                <div className="flex flex-col md:flex-row md:space-x-6 md:overflow-x-auto md:no-scrollbar md:px-0 space-y-6 md:space-y-0 md:translate-x-12">
                    {tweetsBottomRow.map((tweet, i) => (
                        <TweetCard key={i} {...tweet} />
                    ))}
                </div>
            </div>
        </section>
    );
}
