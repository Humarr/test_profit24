import React from "react";

export function FormattedNumberInput({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  // Format value with commas for display
  const formattedValue = value !== undefined && value !== null ? value.toLocaleString() : "";

  // Handle input change
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Remove commas from input string
    const rawValue = e.target.value.replace(/,/g, "");
    // Pass parsed number or empty string back to parent
    const numberValue = rawValue === "" ? "" : Number(rawValue);
    onChange(numberValue.toString());
  }

  return (
    <input
      type="text" // use text here
      value={formattedValue}
      onChange={handleChange}
      placeholder="How much do you want to trade with?"
      className="flex-grow px-4 py-3 rounded-l-lg bg-transparent placeholder:text-brand-slate-400 text-brand-slate-700 focus:outline-none"
    />
  );
}
