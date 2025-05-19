// components/Pricing.tsx

import { ShieldCheck } from "lucide-react";

export default function Pricing() {
    const plans = [
        {
            title: "Basic",
            subtitle: "For personal use and exploration",
            price: 0,
            features: [
                "Access to basic bots",
                "Email support",
                "Community access",
            ],
            popular: false,
        },
        {
            title: "Pro",
            subtitle: "For serious traders and pros",
            price: 29,
            features: [
                "All Basic features",
                "Advanced bots & signals",
                "Priority support",
                "Access to beta features",
            ],
            popular: true,
        },
        {
            title: "Enterprise",
            subtitle: "For businesses and institutions",
            price: 99,
            features: [
                "All Pro features",
                "Dedicated account manager",
                "Custom bot strategies",
                "24/7 premium support",
            ],
            popular: false,
        },
    ];

    return (
        <section className="w-full px-6 py-16 " id="pricing">
            {/* Small header */}
            <div className="max-w-6xl mx-auto mb-4 flex justify-center">
                <p className="inline-block px-4 py-1 text-sm font-semibold text-brand-purple bg-[#e8d8ff] rounded-full">
                    Pricing
                </p>
            </div>


            {/* Headline and Subheadline */}
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-extrabold font-sans text-brand-purple mb-4">
                    Choose your plan
                </h2>
                <p className="text-lg text-brand-slate font-sans">
                    Unlock endless possibilities with our bot
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
                {plans.map(({ title, subtitle, price, features, popular }, i) => (
                    <div
                        key={i}
                        className={`relative flex-1 bg-[#f3e8ff] rounded-3xl shadow-lg p-8 flex flex-col`}
                    >
                        {/* Popular Tag */}
                        {popular && (
                            <span className="absolute top-4 right-4 bg-brand-purple text-white px-3 py-1 text-xs font-semibold rounded-full">
                                Popular
                            </span>
                        )}

                        <h3 className="text-2xl font-bold font-sans mb-1 text-brand-slate">{title}</h3>
                        <p className="text-sm text-brand-slate mb-6">{subtitle}</p>

                        <div className="mb-8 flex items-baseline gap-1">
                            <sup className="text-lg font-semibold text-brand-slate">$</sup>
                            <span className="text-5xl font-extrabold font-sans text-brand-slate">{price}</span>
                            <span className="text-base text-brand-slate font-semibold ml-1">/mo</span>
                        </div>

                        <button className="bg-brand-purple text-white rounded-xl px-8 py-3 w-full max-w-[calc(100%-3rem)] mx-auto font-semibold hover:bg-brand-purple-dark transition">
                            Get Started
                        </button>

                        <ul className="mt-8 space-y-4 flex-1">
                            {features.map((feature, idx) => (
                                <li
                                    key={idx}
                                    className="border-b border-gray-300 pb-2 font-sans text-brand-slate text-sm flex items-center gap-2"
                                >
                                    <ShieldCheck className="w-4 h-4 text-brand-purple" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
