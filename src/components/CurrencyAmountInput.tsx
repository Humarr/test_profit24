"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { FormattedNumberInput } from "./FormattedNumberInput";

interface CurrencyAmountInputProps {
  value: string;
  onChange: (val: string) => void;
  currency: string;
  onCurrencyChange: (val: string) => void;
  currencies: { label: string; value: string }[];
}

export default function CurrencyAmountInput({
  value,
  onChange,
  currency,
  onCurrencyChange,
  currencies,
}: CurrencyAmountInputProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCurrency = currencies.find((c) => c.value === currency);

  return (
    <div className="relative w-full flex rounded-lg border border-brand-cream-300 bg-brand-slate-50/50 focus-within:ring-2 focus-within:ring-brand-purple-200">
      {/* <input
        type="number"
        value={value.toLocaleString()}
        onChange={(e) => onChange(e.target.value)}
        placeholder="How much do you want to trade with?"
        className="flex-grow px-4 py-3 rounded-l-lg bg-transparent placeholder:text-brand-slate-400 text-brand-slate-700 focus:outline-none"
      /> */}

      <FormattedNumberInput value={value} onChange={onChange} />

      <div
        ref={dropdownRef}
        className="relative cursor-pointer select-none rounded-r-lg bg-white border-l border-brand-cream-300 flex items-center px-3 text-brand-slate-700 font-semibold"
        onClick={() => setOpen(!open)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(!open);
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selectedCurrency ? selectedCurrency.label : "Select"}</span>
        <ChevronDown className="ml-1 w-4 h-4 text-brand-slate-400" />

        {open && (
          <ul
            role="listbox"
            className="absolute right-0 top-full mt-1 w-28 rounded-md border border-brand-cream-300 bg-white shadow-lg z-50"
          >
            {currencies.map((c) => (
              <li
                key={c.value}
                role="option"
                aria-selected={c.value === currency}
                className={`cursor-pointer px-3 py-2 text-sm hover:bg-brand-purple-50 ${
                  c.value === currency ? "bg-brand-purple-100 text-brand-purple-700 font-semibold" : "text-brand-slate-700"
                }`}
                onClick={() => {
                  onCurrencyChange(c.value);
                  setOpen(false);
                }}
              >
                {c.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
