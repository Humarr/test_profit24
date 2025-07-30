import React from "react";

export function FormattedNumberInput({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  // Format value with commas for display, handle empty string
  const formattedValue = value && !isNaN(Number(value.replace(/,/g, "")))
    ? Number(value.replace(/,/g, "")).toLocaleString()
    : value;

  // Handle input change
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Remove commas and non-numeric characters, except allow empty string
    const rawValue = e.target.value.replace(/,/g, "");
    const numericValue = rawValue === "" ? "" : rawValue.replace(/[^0-9]/g, "");

    // Prevent leading zeros unless the value is "0" or empty
    const cleanedValue = numericValue.replace(/^0+(?!$)/, "") || "";

    // Pass the cleaned numeric string to parent
    onChange(cleanedValue);
  }

  return (
    <input
      type="text"
      value={formattedValue}
      onChange={handleChange}
      placeholder="How much do you want to trade with?"
      className="flex-grow px-4 py-3 rounded-l-lg bg-transparent placeholder:text-brand-slate-400 text-brand-slate-700 focus:outline-none"
    />
  );
}