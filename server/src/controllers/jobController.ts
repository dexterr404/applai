import express from "express"
import pool from "../config/db.ts";
import { buildJobQuery } from "../utils/buildJobQuery.ts";

export const fetchJobs = async(req: express.Request, res: express.Response) => {
    const status = req.query.status as string | undefined;
    const searchQuery = req.query.searchQuery as string | undefined;
    const sort = req.query.sort as string | undefined;
    const order = req.query.order as string | undefined;
    const userId = (req as any).user?.id;

    try {
       const { baseQuery, values } = buildJobQuery(status, searchQuery, sort, order, userId);

        const result = await pool.query(baseQuery, values);
        return res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json("Database error");
        console.log("Error fetching jobs", error);
    }
}

export const addJob = async(req: express.Request, res: express.Response) => {
    const { company, position, status = "Applied", applied_date, salary, location, link, description } = req.body;
    const userId = (req as any).user?.id;

    try {
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: user not found in token" });
        }

        if (!company || !position) {
            return res.status(400).json({ message: "Company and position are required" });
        }
        
        const result = await pool.query(
            'INSERT INTO jobs (company, position, status, applied_date, salary, location, link, user_id, description) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)  RETURNING *',
            [company, position, status, applied_date, salary, location, link, userId, description]
        );

        return res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Error in adding job controller", error);
        res.status(500).send('Database error');
    }
}

export const updateJob = async(req: express.Request, res: express.Response) => {
    const { id, company, position, status, applied_date, salary, location, link, description } = req.body;
    const userId = (req as any).user?.id;

    try {
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: user not found in token" });
        }

        if (!id) {
            return res.status(400).json({ message: "Job ID is required" });
        }

        if (!company || !position) {
            return res.status(400).json({ message: "Company and position are required" });
        }

        const result = await pool.query(
            'UPDATE jobs SET company = $1, position = $2, status = $3, applied_date = $4, salary = $5, location = $6, link = $7, description = $8 WHERE id = $9 and user_id = $10 RETURNING *',
            [company, position, status, applied_date, salary, location, link, description, id, userId]
        );

        // Check if job exists or belongs to user
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Job not found or not authorized to update" });
        }

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error in updating job controller", error);
        res.status(500).send('Database error');
    }
}

export const deleteJob = async(req: express.Request, res: express.Response) => {
    const { jobId } = req.params;
    const userId = (req as any).user?.id;

    try {
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: user not found in token" });
        }

        const result = await pool.query(
            'DELETE FROM jobs WHERE id = $1 AND user_id = $2',
            [jobId, userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Job not found or not authorized to delete" });
        }

        return res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error("Error in deleting job controller", error);
        res.status(500).send('Database error');
    }
}