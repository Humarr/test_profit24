'use client';
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function Pricing({external}: {external?: boolean}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const plans = [
    {
      id: 1,
      title: "Standard",
      subtitle: "Perfect for beginners who want a simple guided way to start trading with automation",
      price: 0,
      features: [
        "Basic trading bot functionality",
        "Pre-configured strategies",
        "Email support",
        "Community access",
        "Limited to 5 trades/day"
      ],
      popular: false,
    },
    {
      id: 2,
      title: "Premium",
      subtitle: "Perfect for small businesses in need of significant bot capabilities",
      price: 29,
      features: [
        "All Standard features",
        "Advanced trading strategies",
        "Priority email support",
        "Customizable bot parameters",
        "Up to 50 trades/day",
        "Basic analytics dashboard"
      ],
      popular: true,
    },
    {
      id: 3,
      title: "Enterprise",
      subtitle: "For personal use and exploration of AI trading",
      price: 99,
      features: [
        "All Premium features",
        "Unlimited trades",
        "24/7 priority support",
        "Advanced analytics",
        "Custom bot development",
        "Dedicated account manager"
      ],
      popular: false,
    },
  ];

  // Scroll to card by index
  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    const scrollContainer = scrollRef.current;

    if (card && scrollContainer) {
      const cardLeft = card.offsetLeft;
      const containerWidth = scrollContainer.offsetWidth;
      const cardWidth = card.offsetWidth;
      const scrollPosition = cardLeft - (containerWidth - cardWidth) / 2;

      scrollContainer.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  };

  // Track current card index during scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerCenter = container.scrollLeft + container.offsetWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, idx) => {
        if (card) {
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const distance = Math.abs(containerCenter - cardCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = idx;
          }
        }
      });

      setActiveIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full px-4 py-16 sm:px-6 bg-brand-white" id="pricing">
      {/* Header */}
     {(!external) &&( 
      <>
      <div className="max-w-6xl mx-auto mb-4 flex justify-center">
        <p className="inline-block px-4 py-1 text-sm font-semibold font-sans text-brand-purple-500 bg-brand-purple-100 rounded-full">
          Pricing
        </p>
      </div>

      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold font-sans text-brand-slate-700 mb-4">
          Choose your plan
        </h2>
        <p className="text-lg text-brand-slate-500 font-medium font-sans">
          Unlock endless possibilities with our bot
        </p>
      </div>
      </>)
      }

      {/* Mobile Plan Buttons */}
      <div className="md:hidden flex justify-center mb-8 gap-2">
        {plans.map((plan, idx) => (
          <button
            key={plan.id}
            onClick={() => scrollToCard(idx)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeIndex === idx
                ? "bg-brand-purple-500 text-white"
                : "bg-brand-purple-100 text-brand-purple-500 hover:bg-brand-purple-200"
            }`}
          >
            {plan.title}
          </button>
        ))}
      </div>

      {/* Card Container */}
      <div className="relative max-w-6xl mx-auto">
        <div
          ref={scrollRef}
          id="card-scroll"
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 px-4 md:flex-row md:overflow-visible md:snap-none scrollbar-hide"
        >
          {plans.map(({ id, title, subtitle, price, features, popular }, index) => (
            <motion.div
              key={id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: id * 0.1 }}
              className="snap-center shrink-0 w-[85%] sm:w-[70%] md:w-full bg-brand-purple-100 rounded-2xl shadow-lg p-8 flex flex-col relative"
            >
              {popular && (
                <span className="absolute top-4 right-4 bg-brand-orange-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                  Popular
                </span>
              )}

              <h3 className="text-2xl font-bold font-sans mb-1 text-brand-slate-700">{title}</h3>
              <p className="text-sm font-sans text-brand-slate-500 mb-6">{subtitle}</p>

              <div className="mb-8 flex items-baseline gap-1">
                <sup className="text-lg font-semibold text-brand-slate-700">$</sup>
                <span className="text-5xl font-extrabold font-sans text-brand-slate-700">{price}</span>
                <span className="text-base text-brand-slate-500 font-semibold ml-1">/mo</span>
              </div>

              <ul className="mt-8 space-y-3 flex-1 mb-8">
                {features.map((feature, idx) => (
                  <li key={idx} className="font-sans text-brand-slate-600 text-sm flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-purple-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-auto bg-brand-purple-500 text-white rounded-lg px-6 py-3 w-full font-semibold hover:bg-brand-purple-600 transition cursor-pointer">
                Activate Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dot Pagination (Mobile only) */}
      <div className="md:hidden flex justify-center mt-6 gap-2 scrollbar-hide">
        {plans.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToCard(idx)}
            className={`h-2 w-2 rounded-full transition-all ${
              activeIndex === idx ? "bg-brand-purple-500 w-3" : "bg-brand-purple-200"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
