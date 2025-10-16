import express from "express"
import { getUser, googleAuth } from "../controllers/authController.ts";
import { protect } from "../middlewares/authMiddleware.ts";

const router = express.Router();

router.post('/google', googleAuth);
router.get('/me', protect, getUser);

export default router;