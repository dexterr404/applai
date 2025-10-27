import express from 'express'
import { removeResume, uploadResume } from '../controllers/resumeController';
import { uploadPDF } from '../middlewares/uploadResume';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/upload-resume', uploadPDF.single("resume"), protect, uploadResume);
router.post('/remove-resume', protect, removeResume);

export default router;