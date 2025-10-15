import express from "express"
import { addJob, deleteJob, fetchJobs, updateJob } from "../controllers/jobController.ts";

const router = express.Router();

router.get('/all', fetchJobs);
router.post('/add-job', addJob);
router.put('/update-job', updateJob);
router.delete('/:jobId', deleteJob);

export default router;