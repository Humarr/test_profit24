import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function CustomSelect({
  options,
  placeholder,
  value,
  onChange,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Find selected option label
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="relative w-full"
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 text-left flex justify-between items-center ${
          value ? "text-brand-slate-700" : "text-brand-slate-400"
        }`}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <ChevronDown className="w-5 h-5 text-brand-slate-400" />
      </button>

      {/* Dropdown options */}
      {open && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white border border-brand-cream-300 shadow-lg focus:outline-none animate-fadeIn"
          tabIndex={-1}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`cursor-pointer select-none px-4 py-2 text-sm ${
                opt.value === value
                  ? "bg-brand-purple-100 text-brand-purple-700 font-semibold"
                  : "text-brand-slate-700 hover:bg-brand-purple-50"
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-0.25rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
