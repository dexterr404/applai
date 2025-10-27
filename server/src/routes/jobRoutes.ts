import express from "express"
import { addJob, deleteJob, fetchJobs, updateJob } from "../controllers/jobController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.get('/all', protect, fetchJobs);
router.post('/add-job', protect,  addJob);
router.put('/update-job', protect, updateJob);
router.delete('/:jobId', protect, deleteJob);

export default router;