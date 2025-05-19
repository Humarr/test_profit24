// components/BotCards.tsx

export default function BotCards() {
    return (
        <section className="w-full px-6 my-16 bg-white" id="bots">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
                {/* Left Card */}
                <div className="flex-1 bg-[#f3e8ff] text-brand-slate p-8 rounded-2xl shadow-md">
                    <h3 className="text-2xl font-bold font-sans mb-4">The Bots</h3>
                    <p className="text-base font-sans leading-relaxed">
                        Our bots are trained on years of market data, making trades based on sophisticated signals and real-time analytics. Think of them as your tireless trading partners — smart, fast, and always optimizing.
                    </p>
                </div>

                {/* Right Card */}
                <div className="flex-1 bg-brand-purple text-white p-8 rounded-2xl shadow-md">
                    <h3 className="text-2xl font-bold font-sans mb-4">The Bots</h3>
                    <p className="text-base font-sans leading-relaxed">
                        From scalping strategies to long-term trend followers, our bots suit every trading style. Just pick, plug, and profit — no technical know-how needed. Plus, you can monitor everything in real-time.
                    </p>
                </div>
            </div>
        </section>
    );
}
