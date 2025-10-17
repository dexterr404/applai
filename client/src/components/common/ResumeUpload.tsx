import { useState } from "react";
import { removeResume, uploadResume } from "../../api/resumeService";
import { Upload, Paperclip, FileCheck, Loader2, X  } from 'lucide-react';
import { useQueryClient,useMutation } from "@tanstack/react-query";
import type { Job } from "../../types/job";

type ResumeUploadProps = {
  job: Job;
};

export default function ResumeUpload({ job }: ResumeUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [resumeUrl, setResumeUrl] = useState<string | null>(job.resume_url || null);
    const queryClient = useQueryClient();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.[0]) setFile(e.target.files[0]);
    };

    const handleUpload = async() => {
        if(!file) return;
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("resume", file);
            formData.append("id", job.id.toString());

            const data = await uploadResume(formData);
            setResumeUrl(data.resumeUrl);
        } catch (error) {
            console.log('Error in resume upload', error);
        } finally {
            setUploading(false);
        }
    }

    const removeResumeMutation = useMutation({
        mutationFn: (jobId: number) => removeResume(jobId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setResumeUrl(null);
        },
    });

    return (
        <div className="relative max-sm:flex-1">
            <input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileChange}
                className="hidden"
                id={`resume-upload-${job.id}`}
            />
            
            {!resumeUrl ? (
                <>
                    {!file ? (
                        <label 
                            htmlFor={`resume-upload-${job.id}`}
                            className="flex items-center max-sm:w-full justify-center w-9 h-9 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg cursor-pointer transition-colors"
                            title="Attach resume"
                        >
                            <Paperclip className="w-4 h-4" />
                        </label>
                    ) : uploading ? (
                        <div className="flex items-center justify-center max-sm:w-full w-9 h-9 bg-gray-100 text-gray-600 rounded-lg">
                            <Loader2 className="w-4 h-4 animate-spin" />
                        </div>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => handleUpload()}
                                className="flex items-center justify-center max-sm:w-full w-9 h-9 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                                title={`Upload ${file.name}`}
                            >
                                <Upload className="w-4 h-4" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setResumeUrl(null);
                                    setFile(null);
                                }}
                                className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-sm cursor-pointer"
                                title="Remove file"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="relative">
                    <a 
                        href={resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center max-sm:w-full w-9 h-9 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors"
                        title="View resume"
                    >
                        <FileCheck className="w-4 h-4" />
                    </a>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            removeResumeMutation.mutate(job.id);
                            setResumeUrl(null);
                            setFile(null);
                        }}
                        className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-sm cursor-pointer"
                        title="Remove resume"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            )}
        </div>
    )
}