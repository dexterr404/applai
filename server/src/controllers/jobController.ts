import express from "express"
import pool from "../config/db.ts";

export const fetchJobs = async(req: express.Request, res: express.Response) => {
    const status = req.query.status as string | undefined;
    const searchQuery = req.query.searchQuery as string | undefined;

    try {
        let baseQuery = 'SELECT * FROM jobs';
        const conditions: string[] = [];
        const values: string[] = [];

        //Filter by status
        if(status && status !== 'all') {
            values.push(status);
            conditions.push(`status = $${values.length}`);
        }

        //Filter by searchQuery (company or position)
        if(searchQuery) {
            values.push(`%${searchQuery}%`);
            conditions.push(`(company ILIKE $${values.length} OR position ILIKE $${values.length})`);
        }
        
        //Add where clause if needed
        if(conditions.length > 0) {
            baseQuery += ' WHERE ' + conditions.join(' AND ');
        }

        const result = await pool.query(baseQuery, values);
        console.log(result.rows);

        return res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error in fetching jobs controller", error);
        res.status(500).json("Database error");
    }
}

export const addJob = async(req: express.Request, res: express.Response) => {
    const { company, position, status = "Applied", appliedDate, salary, location, link } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO jobs (company, position, status, appliedDate, salary, location, link) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [company, position, status, appliedDate, salary, location, link]
        );

        return res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Error in adding job controller", error);
        res.status(500).send('Database error');
    }
}

export const updateJob = async(req: express.Request, res: express.Response) => {
    const { id, company, position, status, appliedDate, salary, location, link } = req.body;

    try {
        const result = await pool.query(
            'UPDATE jobs SET company = $1, position = $2, status = $3, appliedDate = $4, salary = $5, location = $6, link = $7 WHERE id = $8 RETURNING *',
            [company, position, status, appliedDate, salary, location, link,  id]
        );

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error in updating job controller", error);
        res.status(500).send('Database error');
    }
}

export const deleteJob = async(req: express.Request, res: express.Response) => {
    const { jobId } = req.params;

    try {
        await pool.query(
            'DELETE FROM jobs WHERE id = $1',
            [jobId]
        );

        return res.status(200).json({ message: "Job Deleted" });
    } catch (error) {
        console.error("Error in deleting job controller", error);
        res.status(500).send('Database error');
    }
}