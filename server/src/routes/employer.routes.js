import { Router } from "express";
import {
  acceptEmployeerApplication,
  applyEmployer,
  deniedEmployeerApplication,
  fetchPendingEmployeer,
  fetchPendingEmployeerWithUser,
  fetchRegisteredEmployeer,
  verifyEmployeer,
} from "../controllers/employer.controller.js";

const router = Router();

router.get("/fetch-pending-employeer-with-user", fetchPendingEmployeerWithUser);
router.get("/fetch-pending-employeer", fetchPendingEmployeer);
router.get("/fetch-registered-employeer", fetchRegisteredEmployeer);
router.post("/apply-employeer", applyEmployer);

router.put("/accept-employeer", acceptEmployeerApplication);
router.delete("/denied-employeer/:id", deniedEmployeerApplication);

router.get("/verify-employeer/:id", verifyEmployeer);

export default router;
