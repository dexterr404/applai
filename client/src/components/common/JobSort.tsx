import { useState } from 'react';
import { ArrowUpDown, Building2, Briefcase, DollarSign, Calendar } from 'lucide-react';

type SortField = 'company' | 'position' | 'salary' | 'applied_date';
type SortOrder = 'asc' | 'desc';

interface JobSortProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

export default function JobSort({ sortField, sortOrder, onSort }: JobSortProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { field: 'company' as const, label: 'Company', icon: Building2 },
    { field: 'position' as const, label: 'Position', icon: Briefcase },
    { field: 'salary' as const, label: 'Salary', icon: DollarSign },
    { field: 'applied_date' as const, label: 'Date Applied', icon: Calendar },
  ];

  const currentOption = sortOptions.find(o => o.field === sortField);
  const Icon = currentOption?.icon || ArrowUpDown;

  return (
    <div className="relative justify-self-end">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors font-medium"
      >
        <Icon className="w-4 h-4" />
        <span>Sort: {currentOption?.label}</span>
        <span className="text-xs opacity-60 ml-1">
          {sortOrder === 'asc' ? '↑ A-Z' : '↓ Z-A'}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            {sortOptions.map((option) => {
              const OptionIcon = option.icon;
              return (
                <button
                  key={option.field}
                  onClick={() => {
                    onSort(option.field);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-sm text-left transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className="flex items-center gap-2">
                    <OptionIcon className={`w-4 h-4 ${sortField === option.field ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className={sortField === option.field ? 'font-medium text-blue-600' : 'text-gray-700'}>
                      {option.label}
                    </span>
                  </div>
                  {sortField === option.field && (
                    <span className="text-blue-600 text-xs font-medium">
                      {sortOrder === 'asc' ? '↑ A-Z' : '↓ Z-A'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}