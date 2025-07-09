import { Router } from "express";
import {
  applyEmployer,
  fetchPendingEmployeer,
  fetchPendingEmployeerWithUser,
  fetchRegisteredEmployeer,
} from "../controllers/employer.controller.js";

const router = Router();

router.get("/fetch-pending-employeer-with-user", fetchPendingEmployeerWithUser);
router.get("/fetch-pending-employeer", fetchPendingEmployeer);
router.get("/fetch-registered-employeer", fetchRegisteredEmployeer);
router.post("/apply-employeer", applyEmployer);

export default router;
