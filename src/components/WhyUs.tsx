export default function WhyUs() {
    console.log("rendering WhyUs")
    const cards = [
        {
            title: "Fully Automated Trading",
            description: "Our bots work 24/7 to execute trades based on sophisticated algorithms, eliminating emotional decisions and manual errors. Sleep while the bots trade for you.",
            bgColor: "bg-brand-purple-500",
            textColor: "text-brand-white"
        },
        {
            title: "Consistent Daily Results",
            description: "Designed for steady growth rather than risky gambles. Our bots aim for consistent returns through proven market strategies and risk management.",
            bgColor: "bg-brand-purple-50",
            textColor: "text-brand-slate-700"
        },
        {
            title: "Built for Simplicity",
            description: "No complex setup needed. Get started in minutes with our intuitive interface. Perfect for both beginners and experienced traders.",
            bgColor: "bg-brand-purple-500",
            textColor: "text-brand-white"
        },
        {
            title: "Made for People Who Value Time",
            description: "Reclaim your hours while our bots handle the markets. Focus on what matters while your portfolio grows automatically.",
            bgColor: "bg-brand-purple-50",
            textColor: "text-brand-slate-700"
        }
    ];

    return (
        <section className="w-full px-4 sm:px-6 mb-16 mt-4 bg-white" id="bots">
             <div className="text-center mt-16 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-slate-500 font-sans mb-4">
                    Why choose Profit24?
                </h2>
                <p className="text-brand-slate-500 text-lg font-sans">
                    Unlock Endless Possibilities With Our Bots
                </p>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                {cards.map((card, index) => (
                    <div 
                        key={index}
                        className={`${card.bgColor} ${card.textColor} p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow`}
                    >
                        <h3 className="text-2xl font-bold font-sans mb-4">{card.title}</h3>
                        <p className="text-base font-sans leading-relaxed">
                            {card.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}