"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Star,
  Building2,
  ShieldCheck as ShieldIcon,
  // CheckCircle,
} from "lucide-react";
import BankTransferModal from "./BankTransferModal";
import PaymentMethodModal from "./PaymentMethodModal";
import CryptoPaymentModal from "./CryptoPaymentModal";
// import { useToast } from "./toast/useToast";
// import { usePathname, useRouter } from "next/navigation";
import { User } from "next-auth";
import { useLoadingStore } from "@/store/useLoadingStore";
import useRedirectWithLoading from "@/hooks/useRedirectWithLoading ";

const plans = [
  {
    id: "trial",
    title: "Trial Plan",
    subtitle: "Perfect for beginners who want a simple, guided way to start trading with automation.",
    oldPrice: 99,
    price: 49,
    validity: "30 days",
    features: [
      "Minimum Capital: $500 (via a regulated broker)",
      "24/7 Customer Support",
      "Optimized Risk Strategy",
    ],
    icon: CalendarCheck,
    popular: false,
  },
  {
    id: "recommended",
    title: "Recommended Plan",
    subtitle: "Ideal for those who want hands-on support and smarter strategies with moderate capital.",
    oldPrice: 297,
    price: 129,
    validity: "3 months",
    features: [
      "Minimum Capital: $1,000 (via a regulated broker)",
      "1-on-1 Customer Support",
      "24/7 Access to Technical Team",
      "Optimized Risk Strategy",
    ],
    icon: Star,
    popular: true,
  },
  {
    id: "institutional",
    title: "Institutional Plan",
    subtitle: "Best suited for serious investors looking for deeper support, lower fees, and maximum performance.",
    oldPrice: 594,
    price: 229,
    validity: "6 months",
    features: [
      "Minimum Capital: $3,000 (via a regulated broker)",
      "Dedicated 1-on-1 Support",
      "Direct Call Access to Technical Team (24/7)",
      "Optimized Risk Strategy",
    ],
    icon: Building2,
    popular: false,
  },
  {
    id: "elite",
    title: "Elite Plan",
    subtitle: "Best suited for serious investors looking for deeper support, lower fees, and maximum performance.",
    oldPrice: 1150,
    price: 360,
    validity: "12 months",
    features: [
      "Minimum Capital: $5,000 (via a regulated broker)",
      "Dedicated 1-on-1 Support",
      "Direct Call Access to Technical Team (24/7)",
      "Optimized Risk Strategy",
    ],
    icon: ShieldIcon,
    popular: false,
  },
];

export default function Pricing({
  external,
  currentUser,
}: {
  external?: boolean;
  currentUser?: User | null;
}) {
  const setLoading = useLoadingStore((state) => state.setLoading);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isBankTransferModalOpen, setIsBankTransferModalOpen] = useState(false);
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<string>("");

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

  const { redirectWithLoading } = useRedirectWithLoading();

  const handleActivateClick = async (plan: string, amount: string) => {
    setLoading(true);
    if (!currentUser) {
      redirectWithLoading({
        route: "/auth/login",
        condition: Boolean(currentUser),
        message: "Please login to continue.",
      });
      return;
    }

    setTimeout(() => {
      setSelectedPlan(plan);
      setSelectedAmount(amount);
      setIsPaymentModalOpen(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="w-full px-4 py-16 sm:px-6 bg-brand-white" id="pricing">
      {!external && (
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="inline-block px-4 py-1 text-sm font-semibold text-brand-purple-500 bg-brand-purple-100 rounded-full">
            Pricing
          </p>
          <h2 className="mt-4 text-4xl font-extrabold text-brand-slate-700">
            Choose your plan and start trading today
          </h2>
          <p className="mt-2 text-lg text-brand-slate-500">
            Find the best plan for your trading goals and budget.
          </p>
        </div>
      )}

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

      <div className="relative max-w-6xl mx-auto">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 px-2 md:overflow-visible scrollbar-hide"
        >
          {plans.map(
            (
              {
                id,
                title,
                subtitle,
                price,
                oldPrice,
                validity,
                features,
                icon: Icon,
                popular,
              },
              idx
            ) => (
              <motion.div
                key={id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
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
                  <p className="text-xl font-bold text-brand-purple-700 mt-4">{title}</p>
                  <p className="text-sm text-brand-purple-700 mt-2">
                    {subtitle}
                  </p>
                </div>

                <div className="text-center mb-6">
                  <p className="text-lg text-brand-slate-400 line-through">
                    ${oldPrice}
                  </p>
                  <p className="text-3xl font-extrabold text-brand-purple-700">
                    ${price}/month
                  </p>
                  <p className="text-sm text-brand-purple-700 mt-2">
                    {validity}
                  </p>
                </div>

                <ul className="flex-1 mb-6 space-y-3 text-sm font-medium text-brand-purple-800">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ShieldIcon
                        size={20}
                        className="text-brand-purple-500 mt-0.5"
                      />
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
            )
          )}
        </div>

        <div className="flex justify-center mt-6 gap-2 md:hidden">
          {plans.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className={`w-3 h-3 rounded-full transition cursor-pointer ${
                i === activeIndex
                  ? "bg-brand-purple-500"
                  : "bg-brand-purple-200"
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
