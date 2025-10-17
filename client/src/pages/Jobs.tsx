import { useState } from 'react';
import { Briefcase, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addJob, updateJob, fetchJobs } from '../api/jobService';
import { useDebounce } from '../hooks/useDebounce';
import { useJobStats } from '../hooks/useJobStats';
import { generateJobInterviewTips } from '../api/aiService';
import type { Job, JobSortField, JobSortOrder } from '../types/job';

import JobCard from '../components/jobs/JobCard';
import JobForm from '../components/jobs/JobForm';
import Modal from '../components/ui/Modal';
import JobsFilter from '../components/jobs/JobsFilter';
import Header from '../components/layout/Header';
import EmptyJobsState from '../components/jobs/EmptyJobState';
import JobSort from '../components/common/JobSort';


const Jobs = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [generatingJobId, setGeneratingJobId] = useState<number | null>(null);
  const [sortField, setSortField] = useState<JobSortField>('applied_date');
  const [sortOrder, setSortOrder] = useState<JobSortOrder>('desc');

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: jobs } = useQuery<Job[], Error>({
    queryKey: ['jobs', selectedStatus, debouncedSearchQuery, sortField, sortOrder],
    queryFn: () => fetchJobs(selectedStatus,debouncedSearchQuery, sortField, sortOrder),
  });

  const { data: allJobs = [] } = useQuery<Job[], Error>({
    queryKey: ['jobs', 'all'],
    queryFn: () => fetchJobs('all', ''),
  });

  const queryClient = useQueryClient();

  const addJobMutation = useMutation({
      mutationFn: (newJob: Partial<Job>) => addJob(newJob),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jobs'] })
  });

  const updateJobMutation = useMutation({
    mutationFn: (updatedJob: Partial<Job>) => updateJob(updatedJob),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jobs'] })
  });

  const generateTipsMutation = useMutation({
    mutationFn: (job: Partial<Job>) => generateJobInterviewTips(job),
    onMutate: (job) => {
      setGeneratingJobId(job.id || null);
    },
    onSettled: () => {
      setGeneratingJobId(null);
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  const { total, inProgress, interviews, offers } = useJobStats(allJobs || []);

  // Mock data
  const stats = [
    { label: 'Total Applications', value: total, icon: Briefcase, color: 'bg-blue-500' },
    { label: 'In Progress', value: inProgress, icon: Clock, color: 'bg-yellow-500' },
    { label: 'Interviews', value: interviews, icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Offers', value: offers, icon: CheckCircle, color: 'bg-green-500' },
  ];

  const handleSort = (field: JobSortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="max-w-7xl mx-auto max-sm:p-1 min-h-screen bg-gradient-to-br  from-slate-50 to-slate-100">
      {/* Header */}
      <Header setIsFormOpen={setIsFormOpen}/>
      <div className="max-w-7xl mx-auto py-4 sm:py-8">
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

        {/* Filters & Search */}
        <JobsFilter setSearchQuery={setSearchQuery} searchQuery={searchQuery} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
        <JobSort sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}/>

        {/* Jobs List */}
        <div className="space-y-3 pb-20 sm:space-y-4">
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
                onGenerate={(job) => generateTipsMutation.mutate(job)}
                generating={generatingJobId === job.id}
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