'use client';

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Star,
  Building2,
  ShieldCheck as ShieldIcon
} from "lucide-react";
import BankTransferModal from "./BankTransferModal";
import PaymentMethodModal from "./PaymentMethodModal";
import CryptoPaymentModal from "./CryptoPaymentModal";

const plans = [
  {
    id: "trial",
    title: "Trial",
    subtitle: "30 days validity",
    oldPrice: 99,
    price: 49,
    features: [
      "Basic trading bot",
      "Email support",
      "Community access",
      "Limited strategy customization"
    ],
    icon: CalendarCheck,
    popular: false,
  },
  {
    id: "recommended",
    title: "Recommended",
    subtitle: "3 months validity",
    oldPrice: 297,
    price: 129,
    features: [
      "All Trial features",
      "Advanced strategy builder",
      "Priority email support",
      "Up to 50 trades/day"
    ],
    icon: Star,
    popular: true,
  },
  {
    id: "institutional",
    title: "Institutional",
    subtitle: "6 months validity",
    oldPrice: 594,
    price: 229,
    features: [
      "All Recommended features",
      "Analytics dashboard",
      "24/7 support",
      "Custom alerts & triggers"
    ],
    icon: Building2,
    popular: false,
  },
  {
    id: "elite",
    title: "Elite",
    subtitle: "12 months validity",
    oldPrice: 1150,
    price: 360,
    features: [
      "All Institutional features",
      "Dedicated account manager",
      "Unlimited trades",
      "AI optimization features"
    ],
    icon: ShieldIcon,
    popular: false,
  }
];

export default function Pricing({ external }: { external?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isBankTransferModalOpen, setIsBankTransferModalOpen] = useState(false);
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<string>('');

  const handleBankPaymentSuccess = () => {
    setIsBankTransferModalOpen(false);
    setSelectedPlan("");
    setSelectedAmount("");
    setIsPaymentModalOpen(false);
  };

  const handleCryptoPaymentSuccess = () => {
    setIsCryptoModalOpen(false);
    setSelectedPlan("");
    setSelectedAmount("");
    setIsPaymentModalOpen(false);
  };

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    const container = scrollRef.current;
    if (card && container) {
      const left = card.offsetLeft;
      const cw = container.offsetWidth;
      const cwid = card.offsetWidth;
      const pos = left - (cw - cwid) / 2;
      container.scrollTo({ left: pos, behavior: "smooth" });
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onScroll = () => {
      const center = container.scrollLeft + container.offsetWidth / 2;
      let closest = 0;
      let dist = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (card) {
          const cc = card.offsetLeft + card.offsetWidth / 2;
          const d = Math.abs(center - cc);
          if (d < dist) {
            dist = d;
            closest = i;
          }
        }
      });
      setActiveIndex(closest);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const handleActivateClick = (plan: string, amount: string) => {
    // if (plan === "Trial") {
    //   const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL;
    //   if (!whatsappUrl) {
    //     console.error("WhatsApp URL is not defined");
    //     return;
    //   }
    //   const message = encodeURIComponent(
    //     "Hello I have just completed a payment for my bot plan and I need your help to get started. Please provide me with the details of the bot so I can start using it. Thank you!"
    //   );
    //   setTimeout(() => {
    //     window.location.href = `${whatsappUrl}/?text=${message}`;
    //   }, 1500);
    //   return;
    // }

    setSelectedPlan(plan);
    setSelectedAmount(amount);
    setIsPaymentModalOpen(true);
  };

  return (
    <section className="w-full px-4 py-16 sm:px-6 bg-brand-white" id="pricing">
      {!external && (
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="inline-block px-4 py-1 text-sm font-semibold text-brand-purple-500 bg-brand-purple-100 rounded-full">
            Pricing
          </p>
          <h2 className="mt-4 text-4xl font-extrabold text-brand-slate-700">Choose your plan</h2>
          <p className="mt-2 text-lg text-brand-slate-500">Unlock endless possibilities with our bot</p>
        </div>
      )}

      {/* Mobile navigation buttons */}
      <div className="md:hidden flex justify-center mb-6 gap-2">
        {plans.map((p, i) => (
          <button
            key={p.id}
            onClick={() => scrollToCard(i)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeIndex === i
                ? "bg-brand-purple-500 text-white"
                : "bg-brand-purple-100 text-brand-purple-500 hover:bg-brand-purple-200 cursor-pointer"
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Pricing cards */}
      <div className="relative max-w-6xl mx-auto">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 px-2 md:overflow-visible scrollbar-hide"
        >
          {plans.map(({ id, title, subtitle, price, oldPrice, features, icon: Icon, popular }, idx) => (
            <motion.div
              key={id}
              ref={(el) => { cardRefs.current[idx] = el }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="snap-center shrink-0 w-[90%] sm:w-[360px] md:flex-1 bg-brand-purple-100 rounded-2xl shadow-lg p-8 flex flex-col relative"
            >
              {popular && (
                <div className="absolute top-4 right-4 bg-brand-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Recommended
                </div>
              )}

              <div className="mb-4 text-center">
                <Icon size={32} className="mx-auto text-brand-purple-500" />
                <p className="text-sm text-brand-purple-700 mt-2">{subtitle}</p>
              </div>

              <div className="text-center mb-6">
                <p className="text-lg text-brand-slate-400 line-through">${oldPrice}</p>
                <p className="text-3xl font-extrabold text-brand-purple-700">${price}</p>
              </div>

              <ul className="flex-1 mb-6 space-y-3 text-sm font-medium text-brand-purple-800">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ShieldIcon size={20} className="text-brand-purple-500 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleActivateClick(title, price.toString())}
                className="mt-auto px-6 py-3 w-full font-semibold rounded-lg bg-brand-purple-500 text-white hover:bg-brand-purple-600 transition duration-300 cursor-pointer"
              >
                Activate Plan
              </button>
            </motion.div>
          ))}
        </div>

        {/* Dots for mobile carousel */}
        <div className="flex justify-center mt-6 gap-2 md:hidden">
          {plans.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className={`w-3 h-3 rounded-full transition cursor-pointer ${
                i === activeIndex ? "bg-brand-purple-500" : "bg-brand-purple-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        plan={selectedPlan}
        amount={selectedAmount}
        onBankTransferSelect={() => setIsBankTransferModalOpen(true)}
        onCryptoSelect={() => setIsCryptoModalOpen(true)}
      />
      <BankTransferModal
        isOpen={isBankTransferModalOpen}
        onClose={() => setIsBankTransferModalOpen(false)}
        plan={selectedPlan}
        amount={selectedAmount}
        onSuccess={handleBankPaymentSuccess}
      />
      <CryptoPaymentModal
        isOpen={isCryptoModalOpen}
        onClose={() => setIsCryptoModalOpen(false)}
        plan={selectedPlan}
        amount={selectedAmount}
        onSuccess={handleCryptoPaymentSuccess}
      />
    </section>
  );
}
