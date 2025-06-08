'use client';
import { useRef, useState, useEffect } from "react";

interface YearSelectorProps {
    years: number[];
    selectedYear: number;
    setSelectedYear: (year: number) => void;
}

export default function YearSelector({
    years,
    selectedYear,
    setSelectedYear,
}: YearSelectorProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleScroll = () => {
            setShowLeftFade(el.scrollLeft > 0);
            setShowRightFade(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
        };

        handleScroll(); // initial check
        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Automatically scroll selected year into center view
        const selectedIndex = years.findIndex((y) => y === selectedYear);
        const button = buttonRefs.current[selectedIndex];
        if (button) {
            button.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    }, [selectedYear, years]);

    return (
        <div className="relative mb-10">
            <div
                ref={scrollRef}
                className="flex overflow-x-auto px-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
            >
                {years.map((year, index) => {
                    const isActive = year === selectedYear;
                    return (
                        <button
                            key={year}
                            ref={(el) => {
                                buttonRefs.current[index] = el;
                            }}
                            onClick={() => setSelectedYear(year)}
                            className={`flex-shrink-0 snap-center px-5 py-2 mx-2 rounded-md font-semibold transition-colors ${isActive
                                    ? "bg-brand-purple-500 text-white"
                                    : "bg-brand-purple-100 border border-brand-purple-500 text-brand-purple-500"
                                }`}
                        >
                            {year}
                        </button>
                    );
                })}
            </div>

            {/* Fade indicators */}
            {showLeftFade && (
                <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white via-white/80 to-transparent" />
            )}
            {showRightFade && (
                <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white via-white/80 to-transparent" />
            )}
        </div>
    );
}
