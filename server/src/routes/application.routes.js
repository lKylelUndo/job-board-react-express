import { Router } from "express";
import { addApplication } from "../controllers/application.controller.js";

const router = Router();

router.post("/add-application", addApplication);

export default router;
