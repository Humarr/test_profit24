import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
      >
        {selectedOption?.label || placeholder}
        <ChevronDown className="float-right" />
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`px-4 py-2 cursor-pointer text-brand-slate-500 hover:bg-brand-purple-100 ${
                opt.value === value ? 'bg-brand-purple-50 font-medium' : ''
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
