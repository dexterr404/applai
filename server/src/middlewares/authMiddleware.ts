import jwt from "jsonwebtoken"
import pool from "../config/db.ts"
import dotenv from "dotenv"

dotenv.config();

export const protect = async(req: any, res: any, next: any) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

            //Fetch user from DB
            const result = await pool.query("SELECT id, email, name, picture FROM users where id = $1", [decoded.id]);
            req.user = result.rows[0];

            if(!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next();
        } catch (error) {
            console.error("Auth middleware error:", error);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
}