import { useState } from "react";

export type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
}: SelectProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Selected value button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full border-1 rounded p-2 bg-white text-left focus:outline-none focus:ring-1"
      >
        {selectedLabel}
      </button>

      {/* Dropdown menu */}
      {open && (
        <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded shadow-lg z-10 max-h-48 overflow-auto">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                value === opt.value ? "bg-gray-50 font-medium" : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
