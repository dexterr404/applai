export default function JobCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 animate-pulse">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Position and Status */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="h-6 w-48 bg-gray-200 rounded"></div>
            </div>
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </div>

          {/* Company */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
            <div className="h-5 w-32 bg-gray-200 rounded"></div>
          </div>

          {/* Details (Date, Location, Salary) */}
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
      </div>

      {/* AI Insight Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4 border border-purple-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-purple-200 rounded"></div>
          <div className="h-4 w-20 bg-purple-200 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-purple-100 rounded w-full"></div>
          <div className="h-3 bg-purple-100 rounded w-5/6"></div>
          <div className="h-3 bg-purple-100 rounded w-4/6"></div>
          <div className="h-3 bg-purple-100 rounded w-3/4"></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
        <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
          <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}