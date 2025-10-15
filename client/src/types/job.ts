export type JobStatus = 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export type Job = {
  id: number;
  company: string;
  position: string;
  status: JobStatus;
  applieddate: string;
  salary: string;
  location: string;
  link: string;
  aiInsight: string;
};