import axios from "axios";
import type{ Job } from "../types/job";
import { useToken } from "../hooks/useToken";

export async function fetchJobs(selectedStatus: string,searchQuery: string) {
    const token = useToken();
    const searchParam = searchQuery ? `${encodeURIComponent(searchQuery)}` : "";
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs/all?status=${selectedStatus}&searchQuery=${searchParam}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res.data
    } catch (error) {
        console.log("Error in fetching jobs function", error);
    }
}

export async function addJob(job: Partial<Job>) {
    const token = useToken();
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/jobs/add-job`,
            job,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res.data;
    } catch (error) {
        console.log("Error in add job function", error);
    }
}

export async function updateJob(job: Partial<Job>) {
    const token = useToken();
    try {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/jobs/update-job`,
            job,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res.data;
    } catch (error) {
        console.log("Error in update job function", error);
    }
}

export async function deleteJob(jobId: number) {
    const token = useToken();
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/jobs/${jobId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (error) {
        console.log("Error in update job function", error);
    }
}