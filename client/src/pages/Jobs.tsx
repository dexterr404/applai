import { useState } from 'react';
import { Briefcase, Clock, CheckCircle, TrendingUp, Sparkles } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addJob, updateJob } from '../api/JobService';
import { fetchJobs } from '../api/JobService';
import type { Job } from '../types/job';

import Button from '../components/ui/Button';
import JobCard from '../components/jobs/JobCard';
import JobForm from '../components/jobs/JobForm';
import Modal from '../components/ui/Modal';
import JobsFilter from '../components/jobs/JobsFilter';
import Header from '../components/layout/Header';
import EmptyJobsState from '../components/jobs/EmptyJobState';
import { useDebounce } from '../hooks/useDebounce';

const Jobs = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: jobs } = useQuery<Job[], Error>({
    queryKey: ['jobs', selectedStatus, debouncedSearchQuery],
    queryFn: () => fetchJobs(selectedStatus,debouncedSearchQuery),
  });

  const queryClient = useQueryClient();

  const addJobMutation = useMutation({
      mutationFn: (newJob: Partial<Job>) => addJob(newJob),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jobs'] })
  });

  const updateJobMutation = useMutation({
    mutationFn: (updatedJob: Partial<Job>) => updateJob(updatedJob),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jobs']})
  });


  // Mock data
  const stats = [
    { label: 'Total Applications', value: 24, icon: Briefcase, color: 'bg-blue-500' },
    { label: 'In Progress', value: 8, icon: Clock, color: 'bg-yellow-500' },
    { label: 'Interviews', value: 5, icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Offers', value: 2, icon: CheckCircle, color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <Header setIsFormOpen={setIsFormOpen}/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`${stat.color} p-2 sm:p-3 rounded-lg`}>
                  <stat.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* AI Insights Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 text-white shadow-lg">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="bg-white/20 p-2 sm:p-3 rounded-lg flex-shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base sm:text-lg mb-2">AI Insights Ready</h3>
              <p className="text-white/90 text-xs sm:text-sm mb-3">
                3 applications need follow-up. TechCorp interview is in 2 days - generate prep questions?
              </p>
              <Button className='bg-white text-purple-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-white/90 transition-colors'>
                View Recommendations
              </Button>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <JobsFilter setSearchQuery={setSearchQuery} searchQuery={searchQuery} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>

        {/* Jobs List */}
        <div className="space-y-3 sm:space-y-4">
          {jobs?.length === 0 ? (
            <EmptyJobsState 
              hasFilters={selectedStatus !== 'all' || !!searchQuery}
              filterType={selectedStatus !== 'all' ? 'status' : searchQuery ? 'search' : ''}
              setIsFormOpen={setIsFormOpen}
            />
          ) : (
            jobs?.map((job) => (
              <JobCard
                key={job.id}
                job={job} 
                onEdit={(job) => {
                  setSelectedJob(job);
                  setIsFormOpen(true);
                }}
              />
            ))
          )}
        </div>
      </div>
      
      <Modal 
        isOpen={isFormOpen} 
        onClose={() => { 
          setIsFormOpen(false); 
          setSelectedJob(null);
        }} 
        title={selectedJob ? "Edit Job" : "Add Job"}
      >
        <JobForm 
          initialData={selectedJob ?? {}}
          onSubmit={(data) => {
            console.log("Submitted data", data);
            setIsFormOpen(false);
            setSelectedJob(null);
            if(selectedJob) {
              updateJobMutation.mutate(data);
            } else {
              addJobMutation.mutate(data);
            }
          }}
          submitLabel={selectedJob ? "Update Job" : "Add Job"}
        />
      </Modal>
    </div>
  );
};

export default Jobs;