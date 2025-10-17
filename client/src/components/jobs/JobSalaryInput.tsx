import { useEffect } from "react";
import { currencies } from "../../data/currencies";

interface SalaryInputProps {
  salary: string;
  currency: string;
  onSalaryChange: (salary: string) => void;
  onCurrencyChange: (currency: string) => void;
}

export default function SalaryInput({ salary, currency, onSalaryChange, onCurrencyChange }: SalaryInputProps) {
  const currentCurrency = currencies.find(c => c.code === currency);

  useEffect(() => {
    if (salary && !salary.includes(",")) {
      const formatted = salary
        .split("-")
        .map(s => s.trim().replace(/,/g, ""))
        .map(s => (s ? Number(s).toLocaleString() : ""))
        .join(" - ");
      onSalaryChange(formatted);
    }
  }, []);

  const handleFocus = () => {
    const unformatted = salary.replace(/,/g, "");
    onSalaryChange(unformatted);
  };

  const handleBlur = () => {
    const formatted = salary
      .split("-")
      .map(s => s.trim().replace(/,/g, ""))
      .map(s => (s ? Number(s).toLocaleString() : ""))
      .join(" - ");
    onSalaryChange(formatted);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // ✅ Only allow digits, commas, and an optional dash for range
    const regex = /^[0-9,]*\s*(-?\s*[0-9,]*)?$/;

    if (value === "" || regex.test(value)) {
      onSalaryChange(value);
    }
  };

  return (
    <div className='col-span-2'>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Salary
      </label>
      <div className="flex gap-2">
        {/* Currency Selector */}
        <div className="relative">
          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="appearance-none w-28 pl-3 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {currencies.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.symbol} {curr.code}
              </option>
            ))}
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Salary Input */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm">
            {currentCurrency?.symbol}
          </span>
          <input
            name="salary"
            type="text"
            placeholder="e.g. 80000 - 120000"
            value={salary}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1.5">
        Enter amount or range (e.g., 80,000 or 80,000 - 120,000)
      </p>
    </div>
  );
}
