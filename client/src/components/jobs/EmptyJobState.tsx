import { Briefcase, Filter } from 'lucide-react';
import Button from '../ui/Button';

type EmptyJobsStateProps = {
    hasFilters: boolean;
    filterType: string;
    setIsFormOpen: (data: boolean) => void;
}

export default function EmptyJobsState({ hasFilters = false, filterType = '', setIsFormOpen }: EmptyJobsStateProps){
  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-gray-100 rounded-full p-6 mb-4">
          <Filter className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No jobs found
        </h3>
        <p className="text-gray-500 text-center max-w-md mb-6">
          {filterType 
            ? `No jobs match your current ${filterType} filter. Try adjusting your filters to see more results.`
            : 'No jobs match your current filters. Try adjusting your filters to see more results.'
          }
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full p-8 mb-6">
        <Briefcase className="w-16 h-16 text-indigo-600" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
        No jobs yet
      </h3>
      <p className="text-gray-500 text-center max-w-md mb-8">
        Start tracking your job applications by adding your first job. Keep all your opportunities organized in one place.
      </p>
      <Button onClick={() => setIsFormOpen(true)} className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
        Add Your First Job
      </Button>
    </div>
  );
};