'use client';
import { useState } from "react";

const currencies = [
    { code: "NGN", symbol: "₦" },
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
];

const periods = ["Daily", "Monthly", "Yearly"];

const yearsAgoOptions = [
    "1 year ago",
    "2 years ago",
    "3 years ago",
    "4 years ago",
    "5 years ago",
];

export default function Calculation() {
    const [currency, setCurrency] = useState(currencies[0]);
    const [period, setPeriod] = useState(periods[1]); // Monthly default
    const [yearsAgo, setYearsAgo] = useState(yearsAgoOptions[0]);
    const [amount, setAmount] = useState(50000); // Default investment amount

    // Placeholder function to calculate return (you'll replace with real logic)
    function calculateReturn() {
        // Simple example: amount grows by 10% * yearsAgo * multiplier depending on period
        const years = parseInt(yearsAgo);
        let multiplier = 1;
        if (period === "Daily") multiplier = 365;
        if (period === "Monthly") multiplier = 12;
        if (period === "Yearly") multiplier = 1;

        // Just a dummy formula for demo
        return Math.round(amount * (1 + 0.10 * years * multiplier));
    }

    return (
        <section className="max-w-5xl mx-auto px-6 pb-20 pt-8">
            <h2 className="text-4xl font-extrabold font-sans text-brand-purple-500 mb-6 text-center">
                Get your calculation
            </h2>

            <div className=" flex text-sm text-brand-slate-500 mb-2 justify-center">If you invested</div>

            {/* Currency + Amount */}
            <div className="flex items-center justify-center gap-2 mb-6">
                {/* Currency Dropdown */}
                <sup>

                    <select
                        value={currency.code}
                        onChange={(e) =>
                            setCurrency(
                                currencies.find((c) => c.code === e.target.value) || currencies[0]
                            )
                        }
                        className="  rounded-md  py-1 text-lg font-semibold cursor-pointer relative text-brand-slate"
                    // style={{ paddingRight: "1.5rem" }}
                    >
                        {currencies.map(({ code, symbol }) => (
                            <option key={code} value={code} className="text-brand-slate">
                                {symbol}
                            </option>
                        ))}
                    </select>
                </sup>

                {/* Amount Display */}
                <div className="relative font-extrabold text-3xl text-brand-purple flex items-center justify-center">
                    {/* Subscript currency symbol */}
                    {/* <span className="text-sm align-sub mr-1">{currency.symbol}</span> */}
                    <p
                        className="w-36 text-right focus:outline-none focus:border-brand-purple text-3xl font-extrabold"
                    >
                        {amount.toLocaleString()}
                    </p>

                    {/* <input
                        type="number"
                        min={0}
                        max={1000000}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-36 text-right focus:outline-none focus:border-brand-purple text-3xl font-extrabold"
                    /> */}
                </div>
            </div>

            {/* Dropdowns */}
            <div className="flex gap-6 mb-8 justify-center ">
                <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="px-4 py-2  rounded-md cursor-pointer font-semibold text-brand-purple-500 text-sm"
                >
                    {periods.map((p) => (
                        <option key={p} value={p}>
                            {p}
                        </option>
                    ))}
                </select>

                <select
                    value={yearsAgo}
                    onChange={(e) => setYearsAgo(e.target.value)}
                    className="px-4 py-2  rounded-md cursor-pointer font-semibold text-brand-purple-500 text-sm"
                >
                    {yearsAgoOptions.map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>

            {/* Slider */}
            <input
                type="range"
                min={0}
                max={1000000}
                step={1000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-3 rounded-lg appearance-none cursor-pointer
          bg-gradient-to-r from-brand-purple to-gray-300
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-6
          [&::-webkit-slider-thumb]:h-6
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-[#d8b4fe]
          [&::-moz-range-thumb]:w-6
          [&::-moz-range-thumb]:h-6
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-[#d8b4fe]"
            />

            {/* Result */}
            <p className="mt-6 text-sm text-brand-slate-500 flex justify-center">Today, you&#39;d have</p>
            {/* <div className="flex justify-center">
                <p className="text-sm text-brand-slate">Based on {period} returns</p>
                <span className="text-sm text-brand-slate font-bold mx-1">|</span>
                <p className="text-sm text-brand-slate">Invested {yearsAgo}</p>
                <span className="text-sm text-brand-slate font-bold mx-1">|</span>
                <p className="text-sm text-brand-slate">Returns {period}</p>
            </div> */}
            <div className="flex justify-center mt-4">
                <p className="text-4xl font-medium font-sans text-brand-slate/80 flex justify-center items-baseline">
                    <sup className="text-2xl -translate-y-1">{currency.symbol}</sup>
                    {calculateReturn().toLocaleString()}
                </p>
            </div>

        </section>
    );
}
