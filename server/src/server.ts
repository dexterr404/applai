import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import jobRoutes from "./routes/jobRoutes"
import authRoutes from "./routes/authRoutes"
import aiRoutes from "./routes/aiRoutes"
import resumeRoutes from "./routes/resumeRoutes"

dotenv.config();

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.APP_BASE_URL!,
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());

app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/resume', resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

