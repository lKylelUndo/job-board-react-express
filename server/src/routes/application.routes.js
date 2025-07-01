import { Router } from "express";
import {
  addApplication,
  getAllApplication,
} from "../controllers/application.controller.js";

const router = Router();

router.get("/get-all-applied-jobs/:id", getAllApplication);
router.post("/add-application", addApplication);

export default router;
