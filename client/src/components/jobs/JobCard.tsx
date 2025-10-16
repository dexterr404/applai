import Button from "../ui/Button"
import Chip from "../ui/Chip"

import { Calendar,ExternalLink,Sparkles, Trash } from "lucide-react"
import { statusColors } from "../../data/statusColors";
import type { Job } from "../../types/job";
import Modal from "../ui/Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob } from "../../api/jobService";

type JobCardProps = {
  job: Job;
  onEdit: (job: Job) => void;
};

export default function JobCard({job, onEdit}: JobCardProps) {
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const deleteJobMutation = useMutation({
      mutationFn: (jobId: number) => deleteJob(jobId),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jobs']})
    });

    const handleDelete = async() => {
      try {
        deleteJobMutation.mutate(job.id);
      } catch (error) {
        console.log("Error deleting job", error);
      }
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-slate-800 text-left">{job.position}</h3>
                    <Chip label={job.status} className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[job.status]}`}/>
                  </div>
                  <p className="text-slate-600 font-medium text-lg mb-1 max-sm:text-left">{job.company}</p>
                  <div className="flex items-center max-sm:flex-col max-sm:items-start max-sm:mt-4 flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Applied {new Date(job.applied_date).toLocaleDateString()}
                    </span>
                    <span>{job.location}</span>
                    <span className="font-medium text-slate-700">{job.salary}</span>
                  </div>
                </div>
                <Button 
                onClick={() => setIsDeleteOpen(true)}
                icon={Trash} iconSize={16} className="text-white bg-red-500 hover:bg-red-600 p-1.5 rounded-md"/>
              </div>

              {/* AI Insight */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4 border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">AI Insight</span>
                </div>
                <p className="text-sm text-slate-700">{job.aiInsight}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 max-sm:flex-col">
                <a href={job.link} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button disabled={job.link ? false : true} icon={ExternalLink} iconSize={16} className={`w-full bg-slate-100 ${job.link && "hover:bg-slate-200"} text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2`}>
                  View Job
                </Button>
                </a>
                <Button icon={Sparkles} iconSize={16} className='flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center justify-center gap-2'>
                  AI Interview Prep
                </Button>
                <Button  onClick={() => onEdit(job)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Edit
                </Button>
              </div>
              <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                <h2 className="font-semibold text-lg py-4">Do you really want to delete this job?</h2>
                <div className="flex justify-between items-center py-4">
                  <Button 
                  onClick={() => setIsDeleteOpen(false)}
                  className="bg-blue-600 min-w-24 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    No
                  </Button>
                  <Button
                   onClick={handleDelete}
                   className="bg-red-600 min-w-24 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                    Delete
                  </Button>
                </div>
              </Modal>
            </div>
    )
}