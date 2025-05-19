// components/Infrastructure.tsx
"use client";

import Image from "next/image";

export default function Infrastructure() {
    return (
        <section className="w-full bg-brand-white pb-20 px-6" id="infrastructure">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                {/* Image: Desktop */}
                <div className="flex-1">
                    <Image
                        src="/illustrations/computer.png"
                        alt="Automated trading desktop"
                        width={500}
                        height={400}
                        className="w-full h-auto"
                        priority
                    />
                </div>

                {/* Image: Server */}
                <div className="flex-1">
                    <Image
                        src="/illustrations/server.png"
                        alt="Bot infrastructure server"
                        width={500}
                        height={400}
                        className="w-full h-auto"
                    />
                </div>
            </div>

            <div className="text-center mt-16 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-slate font-sans mb-4">
                    Why choose Profit24?
                </h2>
                <p className="text-brand-slate text-lg font-sans">
                    Unlock Endless Possibilities With Our Bots
                </p>
            </div>
        </section>
    );
}
