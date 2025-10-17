import { Calendar,ExternalLink,Sparkles,Trash,MapPin, HandCoins, BriefcaseBusiness, Building2, Pencil } from "lucide-react"
import { statusColors } from "../../data/statusColors";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob } from "../../api/jobService";
import { getCurrencySymbol } from "../../utils/getCurrencySymbol";
import type { Job } from "../../types/job";

import Button from "../ui/Button"
import Chip from "../ui/Chip"
import ReactMarkdown from "react-markdown";
import ResumeUpload from "../common/ResumeUpload";
import Modal from "../ui/Modal";

type JobCardProps = {
  job: Job;
  onEdit: (job: Job) => void;
  onGenerate: (job: Job) => void;
  generating: boolean;
};

export default function JobCard({job, onEdit, onGenerate, generating}: JobCardProps) {
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
 
    const queryClient = useQueryClient();

    const deleteJobMutation = useMutation({
      mutationFn: (jobId: number) => deleteJob(jobId),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jobs']})
    });

    const handleDelete = async () => {
      try {
        setLoading(true);
        await deleteJobMutation.mutateAsync(job.id);
      } catch (error) {
        console.log("Error deleting job", error);
      } finally {
        setLoading(false);
      }
    };


    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all group">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center max-sm:flex-col max-sm:items-start gap-3 mb-2">
                <div className="flex items-center gap-1 text-slate-800">
                  <BriefcaseBusiness className="w-5 h-5"/>
                  <h3 className="text-lg font-semibold text-left">{job.position}</h3>
                </div>
                <Chip label={job.status} className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[job.status]}`}/>
              </div>
              <p className="flex items-center max-sm:justify-start justify-center gap-2 text-slate-700 font-medium text-lg mb-1 max-sm:text-left">
                <Building2 className="w-5 h-5" />
                {job.company}
              </p>
              <div className="flex items-center max-sm:flex-col max-sm:items-start max-sm:mt-4 flex-wrap gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Applied</span>
                  <span className="text-gray-700">{new Date(job.applied_date).toLocaleDateString()}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4"/>
                  <span>
                    {job.location?.trim() ? <span className="text-gray-700">{job.location}</span> : <span className="text-gray-400 italic">Not provided</span>}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <HandCoins className="w-4 h-4"/>
                  <span>
                    {job.salary?.trim() ? <span className="text-gray-700">{job.currency ? `${getCurrencySymbol(job.currency)}` : ""}{job.salary}</span> : <span className="text-gray-400 italic">Not provided</span>}
                  </span>
                </span>
              </div>
            </div>
            <Button 
            onClick={() => setIsDeleteOpen(true)}
            disabled={loading}
            title="Delete job"
            icon={Trash} iconSize={16} className="bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors p-2"/>
          </div>

          {/* AI Insight */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4 border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">AI Insight</span>
            </div>
          {job.ai_insight ? (
            <div className="text-left">
              <div className={`${!expanded ? "line-clamp-6" : ""} prose prose-sm max-w-none text-slate-700`}>
                <ReactMarkdown>{job.ai_insight}</ReactMarkdown>
              </div>

              {/* Show toggle only if long enough */}
              {job.ai_insight.length > 500 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-xs text-purple-600 mt-2 hover:underline cursor-pointer font-medium"
                >
                  {expanded ? "Show Less ▲" : "Show More ▼"}
                </button>
              )}
            </div>
          ) : (
              <div className="flex flex-col items-center justify-center text-sm text-slate-500 italic space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>
                    AI insight not generated yet{" "}
                    <span className="not-italic text-slate-600">
                      (You can only generate once — please provide all necessary details in the
                      description)
                    </span>
                  </span>
                </div>

                {/* 💡 Helpful Tip */}
                <div className="flex items-start gap-2 text-xs  border border-slate-200 rounded-lg px-3 py-2 text-slate-600">
                  <span className="text-yellow-500">💡</span>
                  <p>
                    Tip: Before generating, review your job description — remove extra spaces,
                    include skills, company details, and what makes the role unique for better AI
                    insights.
                  </p>
                </div>
              </div>
          )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 max-sm:flex-col">
            <a href={job.link} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button disabled={job.link ? false : true} icon={ExternalLink} iconSize={16} className={`w-full bg-slate-100 ${job.link ? "hover:bg-slate-200" : "opacity-60"} text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2`}>
              View Job
            </Button>
            </a>
            <Button
              onClick={() => { console.log("sending for insight",job); onGenerate(job)}}
              disabled={ generating || !!job.ai_insight || !job.description?.trim()}
              icon={Sparkles} iconSize={16} className={`flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium ${ generating || !job.ai_insight && job.description?.trim() ? "hover:from-purple-700 hover:to-blue-700" : "opacity-30"} transition-colors flex items-center justify-center gap-2`}>
              {generating ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  AI Interview Prep
                </>
              )}
            </Button>
            <div className="flex items-center gap-2">
              <ResumeUpload job={job}/>
              <Button
                onClick={() => onEdit(job)}
                className="flex items-center justify-center w-9 h-9 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors cursor-pointer max-sm:flex-1"
                title="Edit job"
                icon={Pencil}
                iconSize={16}
              >
              </Button>
            </div>
          </div>
          <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
            <div className="text-center">
              {/* Warning Icon */}
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Job Application
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this job application for <span className="font-medium text-gray-900">{job.position}</span> at <span className="font-medium text-gray-900">{job.company}</span>? This action cannot be undone.
              </p>

              {/* Buttons */}
              <div className="flex gap-3 justify-end">
                <Button 
                  onClick={() => setIsDeleteOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={loading}
                  className={`px-4 py-2 text-sm font-medium text-white ${loading ? "opacity-80" : "hover:bg-red-700 transition-colors"} bg-red-600 rounded-lg`}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Modal>
        </div>
    )
}