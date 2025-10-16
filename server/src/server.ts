import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import jobRoutes from "./routes/jobRoutes.ts"
import authRoutes from "./routes/authRoutes.ts"

dotenv.config();

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"]
}));

app.use(express.json());

app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

