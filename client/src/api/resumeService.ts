import axios from "axios";
import { useToken } from "../hooks/useToken";

export async function uploadResume(formData: FormData): Promise<{ resumeUrl: string }> {
  const token = useToken();
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/resume/upload-resume`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error: any) {
    console.error("Error uploading resume:", error);
    throw error;
  }
}

export async function removeResume(id: number) {
  const token = useToken();
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/resume/remove-resume`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return res.data;
  } catch (error) {
    console.error("Error uploading resume:", error);
  }
}
