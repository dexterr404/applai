import express from "express"
import { generateJobInterviewTips } from "../controllers/aiController.ts";
import { protect } from "../middlewares/authMiddleware.ts";

const router = express.Router();

router.post('/job-prep-interview', protect, generateJobInterviewTips);

export default router;