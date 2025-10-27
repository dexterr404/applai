import express from "express"
import { generateJobInterviewTips } from "../controllers/aiController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post('/job-prep-interview', protect, generateJobInterviewTips);

export default router;