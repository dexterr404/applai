import pool from '../config/db';
import { openAiClient } from '../services/openAiService'
import express from "express"

export const generateJobInterviewTips = async(req: express.Request, res: express.Response) => {
    const { id, description, position } = req.body;
    const userId = (req as any).user?.id;

    try {
        if(!userId) return res.status(401).json({ message: "Unauthorized: user not found in token" });
        if(!id || !description) return res.status(400).json({ message: "Missing jobId or description" });

        const cachedTips = await pool.query(
            `SELECT content FROM job_ai_insights where job_id = $1`,
            [id]
        )

        if (cachedTips.rows.length > 0 && cachedTips.rows[0].content) {
            return res.json({ insight: cachedTips.rows[0].content, cached: true });
        }

        const formattedDescription = description
        .trim()
        .replace(/\s+/g, ' ');

        const prompt = `
        User info: Assume the candidate has experience in ${position}
        Job description: ${formattedDescription}

        Generate 10 interview questions for this job, including answers.
        Also provide additional interview tips tailored to this role and company. 
        Format clearly for display.
        `;

        const completion = await openAiClient.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 1500,
        });

        const insightText = completion.choices[0].message?.content || "No insight generated.";

        await pool.query(
            `INSERT INTO job_ai_insights (job_id, content) VALUES ($1, $2)`,
            [id, insightText]
        );

        res.json({ insight: insightText, cached: false });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}