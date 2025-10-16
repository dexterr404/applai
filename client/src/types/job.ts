export type JobStatus = 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export type Job = {
  id: number;
  company: string;
  position: string;
  status: JobStatus;
  applied_date: string;
  salary: string;
  location: string;
  link: string;
  description:string;
  ai_insight: string;
};