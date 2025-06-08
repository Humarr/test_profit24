'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import TweetCard from './TweetCard';

interface Tweet {
    username: string;
    handle: string;
    date: string;
    content: string;
    avatarUrl: string;
}

const tweetsTopRow: Tweet[] = [
    {
        username: 'Jane Doe',
        handle: 'janedoe',
        date: 'May 10',
        content: 'Profit24 bots have seriously transformed my trading game! Highly recommend for beginners and pros alike.',
        avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
        username: 'Trader Joe',
        handle: 'traderjoe',
        date: 'May 12',
        content: 'Automated bots with AI precision — the future of trading is here. Thanks, Profit24!',
        avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
        username: 'Crypto Queen',
        handle: 'cryptoqueen',
        date: 'May 14',
        content: 'The accuracy and ease of use are unmatched. My portfolio has never looked better.',
        avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
        username: 'Market Master',
        handle: 'marketmaster',
        date: 'May 21',
        content: 'If you\'re serious about trading, Profit24 is the way to go. Automated and reliable.',
        avatarUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
    },
    {
        username: 'Investor X',
        handle: 'investorx',
        date: 'May 23',
        content: 'Saw amazing returns with minimal effort. Love the UI and bot options.',
        avatarUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
    },
    {
        username: 'Crypto Captain',
        handle: 'cryptocaptain',
        date: 'May 25',
        content: 'I was blown away by the accuracy and ease of use. Profit24 is a game-changer!',
        avatarUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
    },

];

const tweetsBottomRow: Tweet[] = [
    {
        username: 'Finance Guru',
        handle: 'financeguru',
        date: 'May 11',
        content: 'Great platform with incredible support. The bots do the heavy lifting for me!',
        avatarUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
    },
    {
        username: 'Market Master',
        handle: 'marketmaster',
        date: 'May 13',
        content: "If you're serious about trading, Profit24 is the way to go. Automated and reliable.",
        avatarUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
    },
    {
        username: 'Investor X',
        handle: 'investorx',
        date: 'May 15',
        content: 'Saw amazing returns with minimal effort. Love the UI and bot options.',
        avatarUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
    },
];

export default function Testimonials() {
    return (
        <section className="py-16 bg-brand-cream-100">
            {/* Heading */}
            <div className="flex justify-center mb-6">
                <div className="bg-brand-purple-100 text-brand-purple-500 text-sm font-semibold font-sans px-6 py-2 rounded-full">
                    Testimonials
                </div>
            </div>

            <h2 className="text-4xl font-bold mb-10 text-center text-brand-slate-500">
               <span className="hidden md:inline-block">Winning Trades. Happy Traders.</span>
                <span className="md:hidden"> You&apos;re in safe hands</span>
            </h2>

            {/* Testimonial Rows */}
            <div className="space-y-12 px-6">
                {/* Top Row (desktop) */}
                <div className="hidden md:flex md:flex-row md:space-x-6 justify-center">
                    {tweetsTopRow.map((tweet, i) => (
                        <TweetCard key={i} {...tweet} />
                    ))}
                </div>

                {/* Mobile Swiper */}
                <div className="md:hidden">
                    <Swiper spaceBetween={16} slidesPerView={1.2}>
                        {tweetsTopRow.map((tweet, i) => (
                            <SwiperSlide key={i}>
                                <TweetCard {...tweet} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Bottom Row (desktop, staggered) */}
                <div className="hidden md:relative md:flex md:flex-row md:space-x-6 justify-center overflow-hidden">
                    <div className="md:translate-x-12 flex gap-6">
                        {tweetsBottomRow.map((tweet, i) => (
                            <TweetCard key={i} {...tweet} />
                        ))}
                    </div>
                </div>

                {/* Mobile Swiper */}
                <div className="md:hidden">
                    <Swiper spaceBetween={16} slidesPerView={1.2}>
                        {tweetsBottomRow.map((tweet, i) => (
                            <SwiperSlide key={i}>
                                <TweetCard {...tweet} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
