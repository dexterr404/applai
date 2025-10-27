import express from 'express'
import { uploadResumetoCloudinary } from '../services/resumeService';
import pool from '../config/db';

export const uploadResume = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.body;
        const file = (req as any).file;

       if (!file) return res.status(400).json({ message: "No file uploaded" });

       const resumeUrl = await uploadResumetoCloudinary(file.buffer, file.originalname);
       if(!resumeUrl) {
        console.log("THERE IS NO RESUME URL");
       }

       await pool.query(
        `UPDATE jobs set resume_url = $1 WHERE id = $2`,
        [resumeUrl, id]
       );

       res.status(201).json({ resumeUrl });
    } catch (error) {
        console.error("Resume upload error", error);
        res.status(500).json({ messag: "Failed to upload resume" });
    }
}

export const removeResume = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.body;

    if (!id) return res.status(400).json({ message: "No job ID provided" });

    const result = await pool.query(
      `UPDATE jobs SET resume_url = NULL WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ job: result.rows[0] });
  } catch (error) {
    console.error("Resume remove error", error);
    res.status(500).json({ message: "Failed to remove resume" });
  }
};