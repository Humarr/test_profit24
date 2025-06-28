'use client';

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useToast } from "@/components/toast/useToast";
import BankTransferModal from "./BankTransferModal";
import PaymentMethodModal from "./PaymentMethodModal";
import CryptoPaymentModal from "./CryptoPaymentModal";

// Helper to convert USD to Naira (₦1,500 per USD)
// const formatNaira = (usd: number) => {
//   const rate = 1500;
//   return `₦${(usd * rate).toLocaleString()}`;
// };

interface Offer {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  features: string[];
  popular: boolean;
}

export default function Pricing({ external }: { external?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingPlan] = useState<string | null>(null);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isBankTransferModalOpen, setIsBankTransferModalOpen] = useState(false);
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<string>('');

  const toast = useToast();

  // const plans = [
  //   {
  //     id: 1,
  //     title: "Standard",
  //     subtitle: "Great for beginners wanting simple automated trading",
  //     price: 0,
  //     features: [
  //       "Basic trading bot",
  //       "Pre-configured strategies",
  //       "Email support",
  //       "Community access",
  //       "Up to 5 trades/day",
  //     ],
  //     popular: false,
  //   },
  //   {
  //     id: 2,
  //     title: "Premium",
  //     subtitle: "Best for small businesses with serious automation needs",
  //     price: 43500,
  //     features: [
  //       "All Standard features",
  //       "Advanced strategies",
  //       "Priority email support",
  //       "Custom bot parameters",
  //       "Up to 50 trades/day",
  //       "Basic analytics dashboard",
  //     ],
  //     popular: true,
  //   },
  //   {
  //     id: 3,
  //     title: "Enterprise",
  //     subtitle: "Ideal for power users and AI-driven trading",
  //     price: 148500,
  //     features: [
  //       "All Premium features",
  //       "Unlimited trades",
  //       "24/7 VIP support",
  //       "Advanced analytics",
  //       "Custom bot dev",
  //       "Dedicated account manager",
  //     ],
  //     popular: false,
  //   },
  // ];

  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/dashboard/offers");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load plans");
        setPlans(data.offers);
      } catch (e) {
        toast((e as Error).message, "error");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, [toast]);

  // const handleSubscribe = async (plan: string) => {
  //   try {
  //     setLoadingPlan(plan);
  //     const res = await fetch("/api/user/subscription", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ plan }),
  //     });
  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.error || "Subscription failed");

  //     toast("Subscription activated!", "success", 5000);
  //     setTimeout(() => {
  //       window.location.href = "https://wa.me/YOUR_WHATSAPP_NUMBER";
  //     }, 1000);
  //   } catch (err) {
  //     toast((err as Error).message, "error", 5000);
  //   } finally {
  //     setLoadingPlan(null);
  //   }
  // };

  const handleBankPaymentSuccess = () => {
    setIsBankTransferModalOpen(false);
    setSelectedPlan("");
    setSelectedAmount("");
    setIsPaymentModalOpen(false);
    // handleSubscribe(selectedPlan);
  };

  const handleCryptoPaymentSuccess = () => {
    setIsCryptoModalOpen(false);
    setSelectedPlan("");
    setSelectedAmount("");
    setIsPaymentModalOpen(false);
    // handleSubscribe(selectedPlan);
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
    setSelectedPlan(plan);
    setSelectedAmount(amount);
    setIsPaymentModalOpen(true);
  };

  return (
    <section className="w-full px-4 py-16 sm:px-6 bg-brand-white" id="pricing">
      
     {(!loading && plans.length > 0) && (!external && (
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="inline-block px-4 py-1 text-sm font-semibold text-brand-purple-500 bg-brand-purple-100 rounded-full">Pricing</p>
          <h2 className="mt-4 text-4xl font-extrabold text-brand-slate-700">Choose your plan</h2>
          <p className="mt-2 text-lg text-brand-slate-500">Unlock endless possibilities with our bot</p>
        </div>
      ))}
      {(!loading && plans.length > 0) && (
      <div className="md:hidden flex justify-center mb-8 gap-2">
        {plans.map((p, i) => (
          <button
            key={p.id}
            onClick={() => scrollToCard(i)}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeIndex === i
                ? "bg-brand-purple-500 text-white"
                : "bg-brand-purple-100 text-brand-purple-500 hover:bg-brand-purple-200"
            } transition`}
          >
            {p.title}
          </button>
        ))}
      </div>
      )}
      {(!loading && plans.length > 0) && (
      <div className="relative max-w-6xl mx-auto">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 px-4 md:overflow-visible scrollbar-hide"
        >
          {plans.map(({ id, title, subtitle, price, features, popular }, idx) => (
            <motion.div
              key={id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="snap-center shrink-0 min-w-[300px] sm:min-w-[360px] md:flex-1 bg-brand-purple-100 rounded-2xl shadow-lg p-8 flex flex-col relative"
            >
              {popular && (
                <div className="absolute top-4 right-4 bg-brand-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Popular</div>
              )}

              <h3 className="text-2xl font-extrabold mb-2 text-brand-slate-700">{title}</h3>
              <p className="mb-6 text-sm font-medium text-brand-purple-700">{subtitle}</p>

              <div className="text-brand-purple-600 font-bold text-3xl mb-6">
                {price === 0 ? "Free" : price.toLocaleString()}
                {/* {price === 0 ? "Free" : formatNaira(price)} */}
                <span className="text-base font-normal text-brand-purple-700"> / month</span>
              </div>

              <ul className="flex-1 mb-6 space-y-3 text-sm font-medium text-brand-purple-800">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ShieldCheck size={20} className="text-brand-purple-500 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleActivateClick(title, price.toString())}
                disabled={loadingPlan === title}
                className={`mt-auto px-6 py-3 w-full font-semibold rounded-lg transition ${
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
      )}
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
