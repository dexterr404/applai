import express from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import pool from "../config/db.ts"

import { OAuth2Client } from "google-auth-library"

dotenv.config();

const generateToken = (id: number, email: string) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET!, { expiresIn: "7d" });
}

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async(req: express.Request, res: express.Response) => {
    const { token } = req.body;
    
    try {
        // Verify Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if(!payload?.email) {
            return res.status(400).json({ message: "Invalid Google token" });
        }

        //Check if user exists in DB
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [payload.email]);
        let user = existingUser.rows[0];

        //Create user if not existing
        if(!user) {
            const result = await pool.query(
                "INSERT INTO users (email, name, picture) VALUES ($1, $2, $3) RETURNING *", [payload.email, payload.name, payload.picture]
            );
            user = result.rows[0];
        }

        const authToken = generateToken(user.id,user.email);

        return res.status(201).json({ token: authToken, user });
    } catch (error) {
        console.error("Error in Google login", error);
        res.status(500).json({ message: "Google login failed" });
    }
}

export const getUser = async(req: express.Request, res: express.Response) => {
    const userId = (req as any).user?.id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: user not found in token" });
        }

        const result = await pool.query(
            'SELECT id, email, name, picture FROM users WHERE id = $1',
            [userId]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error in fetching user job controller", error);
        res.status(500).send('Database error');
    }
}