import { Router } from "express";
import { applyEmployer } from "../controllers/employer.controller.js";

const router = Router();

router.post("/apply-employer", applyEmployer);

export default router;
