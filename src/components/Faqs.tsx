"use client";
import { useState } from "react";

const faqs = [
  {
    question: "What is Profit24?",
    answer:
      "Profit24 is an automated trading system that helps grow your capital by executing smart trades 24/7, so you don’t have to.",
  },
  {
    question: "How does Profit24 work?",
    answer:
      "Our system connects to your trading account via a regulated broker. Once activated, it scans the market and automatically executes trades using battle-tested strategies, all without your input.",
  },
  {
    question: "Do I need trading experience?",
    answer:
      "Not at all. Profit24 is designed for total beginners as well as experienced traders. You don’t need to understand charts, technical analysis, or market news.",
  },
  {
    question: "Does Profit24 have a verified track record?",
    answer:
      "Yes. Every bot listed on Profit24 has a public trading history and has proven profitable over a sustained period. We believe in transparency and only offer what works.",
  },
  {
    question: "Can I manually trade while using Profit24?",
    answer:
      "No. Manual trading isn’t recommended as it can conflict with the bot’s automated strategies, potentially increasing your risk of losses.",
  },
  {
    question: "Can I use any broker?",
    answer:
      "To ensure optimal performance and fund safety, Profit24 currently works only with regulated brokers we’ve partnered with. You’ll get setup guidance once you choose a plan.",
  },
  {
    question: "Does Profit24 offer customer support?",
    answer:
      "Absolutely. We offer 24/7 customer support, and depending on your plan, you’ll also have access to 1-on-1 assistance and direct calls with our technical team.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach us anytime via live chat on the website, email, or through our dedicated support line. We’re here for you.",
  },
  {
    question: "Can I withdraw my money anytime?",
    answer:
      "Yes. Since your funds are held in your own broker account, you can withdraw anytime. Profit24 doesn’t lock or control your money.",
  },
  {
    question: "Is my capital safe?",
    answer:
      "We don’t touch your funds. They remain in your broker account, and you always have full control. We simply provide the strategy and automation.",
  },
  {
    question: "What kind of results can I expect?",
    answer:
      "Results vary depending on your capital, risk level, and market conditions. However, our system is built for consistent daily wins, and we only list bots that have proven profitable.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-brand-purple-50/10 py-16 px-6 md:px-20" id="faqs">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left Text Column */}
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold text-brand-purple-500 mb-2 uppercase">
            Got Questions?
          </p>
          <h2 className="text-4xl font-extrabold text-brand-purple-500 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-brand-slate-500 text-base max-w-md">
            If you have further questions, please don&#39;t hesitate to reach out to{" "}
            <a
              href="mailto:support@profit24.com"
              className="text-brand-purple underline font-semibold hover:text-brand-purple-dark"
            >
              customer support
            </a>{" "}
            team for assistance.
          </p>
        </div>

        {/* Right Accordion Column */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = idx === openIndex;
            return (
              <div key={idx} className="shadow-lg rounded-lg bg-white">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex justify-between items-center p-4 text-left text-brand-slate-500 font-semibold 
                  font-sans focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  id={`faq-header-${idx}`}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isOpen && (
                  <div
                    id={`faq-panel-${idx}`}
                    role="region"
                    aria-labelledby={`faq-header-${idx}`}
                    className="p-4 text-brand-slate-500 font-sans"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
