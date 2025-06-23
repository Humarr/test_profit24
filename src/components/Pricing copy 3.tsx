'use client';

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useToast } from "@/components/toast/useToast";
import BankTransferModal from "./BankTransferModal";
import PaymentMethodModal from "./PaymentMethodModal";
import CryptoPaymentModal from "./CryptoPaymentModal";

export default function Pricing({ external }: { external?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  // Modals state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isBankTransferModalOpen, setIsBankTransferModalOpen] = useState(false);
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<string>('');

  const toast = useToast();

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

  const handleSubscribe = async (plan: string) => {
    try {
      setLoadingPlan(plan);
      const res = await fetch('/api/user/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Subscription failed');
      }

      toast("Subscription activated!", "success", 5000);

      setTimeout(() => {
        window.location.href = "https://wa.me/YOUR_WHATSAPP_NUMBER";
      }, 1000);
    } catch (err) {
      const error = err as Error;
      toast(error.message, "error", 5000);
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleBankPaymentSuccess = () => {
    setIsBankTransferModalOpen(false);
    setSelectedPlan('');
    setSelectedAmount('');
    setIsPaymentModalOpen(false);
    handleSubscribe(selectedPlan);
  };
  
  const handleCryptoPaymentSuccess = () => {
    setIsCryptoModalOpen(false);
    setSelectedPlan('');
    setSelectedAmount('');
    setIsPaymentModalOpen(false);
    handleSubscribe(selectedPlan);
  };
  



  // Scroll handling code remains the same...

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

  // New: open PaymentMethodModal when activating a plan
  const handleActivateClick = (plan: string, amount: string) => {
    setSelectedPlan(plan);
    setSelectedAmount(amount);
    setIsPaymentModalOpen(true);
  };

  // Handlers to open corresponding payment modals
  const handleBankTransferSelect = () => {
    setIsBankTransferModalOpen(true);
  };

  const handleCryptoSelect = () => {
    setIsCryptoModalOpen(true);
  };

  return (
    <section className="w-full px-4 py-16 sm:px-6 bg-brand-white" id="pricing">
      {!external && (
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
        </>
      )}

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
              <h3 className="text-2xl font-extrabold mb-2 font-sans text-brand-slate-700">{title}</h3>
              <p className="mb-6 font-medium text-sm text-brand-purple-700">{subtitle}</p>
              <div className="text-brand-purple-600 font-bold text-3xl mb-6">
                ${price}
                <span className="text-base font-normal text-brand-purple-700"> / month</span>
              </div>
              <ul className="mb-6 flex-grow space-y-3 font-medium text-brand-purple-800 text-sm">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <ShieldCheck size={20} className="text-brand-purple-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleActivateClick(title, price.toString())}
                disabled={loadingPlan === title}
                className={`mt-auto rounded-lg px-6 py-3 w-full font-semibold transition cursor-pointer ${
                  loadingPlan === title
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-brand-purple-500 text-white hover:bg-brand-purple-600"
                }`}
              >
                {loadingPlan === title ? "Processing..." : "Activate Plan"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        plan={selectedPlan}
        amount={selectedAmount}
        onBankTransferSelect={handleBankTransferSelect}
        onCryptoSelect={handleCryptoSelect}
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
