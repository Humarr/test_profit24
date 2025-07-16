"use client";
import { useState } from "react";

const faqs = [
    {
        question: "How do I get started with Profit24 bots?",
        answer:
            "Simply sign up, choose your plan, and start copying top-performing bots right away.",
    },
    {
        question: "Can I change my subscription plan anytime?",
        answer:
            "Yes, you can upgrade or downgrade your subscription at any time from your account dashboard.",
    },
    {
        question: "Is my investment secure with Profit24?",
        answer:
            "We use industry-standard encryption and follow best security practices to protect your data and investments.",
    },
    {
        question: "What payment methods do you accept?",
        answer:
            "We accept all major credit cards, PayPal, and bank transfers for your convenience.",
    },
];

export default function FAQSection() {
    console.log("rendering FAQSection")
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
                        </a>
                        {" "} team for assistance
                        .
                    </p>
                </div>

                {/* Right Accordion Column */}
                <div className="space-y-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = idx === openIndex;
                        return (
                            <div
                                key={idx}
                                className="shadow-lg rounded-lg bg-white"
                            >
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
                                        className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
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
