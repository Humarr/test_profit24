
'use client';
import { useState } from "react";

export default function InvestmentCalculator() {
  const [investment, setInvestment] = useState(500);
  const [months, setMonths] = useState(12);
  const monthOptions = [1, 3, 6, 12, 24, 36];

  // Simple compound interest calculation (example)
  const calculateTotal = () => {
    const rate = 0.05; // 5% monthly ROI for example
    return (investment * Math.pow(1 + rate, months)).toFixed(2);
  };

  return (
    <section className="w-full px-6 py-16 bg-brand-purple-700 scrollbar-hide" id="calculator">
      <div className="max-w-4xl mx-auto">
        {/* Initial Investment Row */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-brand-purple-100">Initial investment</h3>
          <div className="text-2xl font-bold text-brand-purple-100">${investment}</div>
        </div>

        {/* Calculator Card */}
        <div className="bg-brand-purple-400/20 backdrop-blur-sm rounded-xl p-6 mb-8">
          {/* Slider */}
          <div className="mb-8">
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={investment}
              onChange={(e) => setInvestment(parseInt(e.target.value))}
              className="w-full bg-white rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2 text-brand-purple-100 text-sm">
              <span>$100</span>
              <span>$10,000</span>
            </div>
          </div>

          {/* Months to compound */}
          <h4 className="text-white mb-4">Months to compound</h4>

          {/* Month buttons */}
          {/* <div className="grid grid-cols-3 gap-3 sm:grid-cols-6"> */}
          {/* <div className="flex gap-2"> */}
          <div className="flex gap-4 overflow-x-auto px-1 sm:grid sm:grid-cols-6 sm:px-0 sm:overflow-visible scrollbar-hide">

            {monthOptions.map((option) => {
              const isActive = months === option;
              const fullLabel = `${option} ${option === 1 ? "month" : "months"}`;
              return (
                <div className="relative group" key={option}>
                  <button
                    onClick={() => setMonths(option)}
                    className={`py-2 px-3 rounded-lg font-medium transition-all duration-200 ease-in-out w-full text-center ${
                      isActive
                        ? "bg-white text-brand-purple-500 scale-105"
                        : "bg-brand-purple-400 text-white hover:scale-105"
                    }`}
                  >
                    {/* Large screens: always full label */}
                    <span className="hidden sm:inline">{fullLabel}</span>

                    {/* Small screens: full label only if active */}
                    <span className="sm:hidden">
                      {isActive ? fullLabel : option}
                    </span>
                  </button>

                  {/* Tooltip on small screens for non-active buttons */}
                  {!isActive && (
                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 sm:hidden opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap z-10">
                      {fullLabel}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Total Amount Row */}
        <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">
          Total amount{" "}
          <span className="hidden sm:inline" aria-hidden="true">
            (capital and ROI)
          </span>
        </h3>

          <div className="text-2xl font-bold text-white">${calculateTotal()}</div>
        </div>
      </div>
    </section>
  );
}
