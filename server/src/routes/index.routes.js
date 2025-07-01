import { Router } from "express";
import authRoutes from "./auth.routes.js";
import jobRoutes from "./job.routes.js";
import profileRoutes from "./profile.routes.js";
import applicationRoutes from "./application.routes.js";

const router = Router();

router.use(authRoutes);
router.use(jobRoutes);
router.use(profileRoutes);
router.use(applicationRoutes);

export default router;
