import { Router } from "express";
import { fetchAllCandidates } from "../controllers/user.controller.js";

const router = Router();

router.get("/fetch-all-candidates", fetchAllCandidates)

export default router;