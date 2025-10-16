import axios from "axios";
import type { Job } from "../types/job";
import { useToken } from "../hooks/useToken";

export async function generateJobInterviewTips(job: Partial<Job>) {
    const token = useToken();
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/ai/job-prep-interview`,
            job,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (error) {
        console.error("Error in generating interview tips function", error);
    }
}