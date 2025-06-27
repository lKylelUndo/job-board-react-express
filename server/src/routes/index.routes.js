import { Router } from "express";
import authRoutes from "./auth.routes.js";
import jobRoutes from "./job.routes.js";

const router = Router();

router.use(authRoutes);
router.use(jobRoutes);

export default router;
