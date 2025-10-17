import express from 'express'
import { removeResume, uploadResume } from '../controllers/resumeController.ts';
import { uploadPDF } from '../middlewares/uploadResume.ts';
import { protect } from '../middlewares/authMiddleware.ts';

const router = express.Router();

router.post('/upload-resume', uploadPDF.single("resume"), protect, uploadResume);
router.post('/remove-resume', protect, removeResume);

export default router;