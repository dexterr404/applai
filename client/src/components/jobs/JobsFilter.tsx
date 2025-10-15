import { Search } from "lucide-react"

import Button from "../ui/Button"


type JobsFilterProps = {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    selectedStatus: string;
    setSelectedStatus: (value: string) => void;
}

export default function JobsFilter({searchQuery,setSearchQuery,selectedStatus,setSelectedStatus}: JobsFilterProps) {

    return (
        <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm border border-slate-200">
          <div className="flex flex-col gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search by company or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
              {['all', 'Applied', 'Interview', 'Offer', 'Rejected'].map((status) => (
                <Button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg font-medium transition-colors text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
                    selectedStatus === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status === 'all' ? 'All' : status}
                </Button>
              ))}
            </div>
          </div>
        </div>
    )
}