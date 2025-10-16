import type { Job } from "../types/job";

export function useJobStats(jobs: Job[]) {
    const total = jobs.length;
    const inProgress = jobs.filter(job => job.status === "Applied" || job.status === "Interview").length;
    const interviews = jobs.filter(job => job.status === "Interview").length;
    const offers = jobs.filter(job => job.status ===  "Offer").length;

    return { total, inProgress, interviews, offers };
}