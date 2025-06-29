import { Router } from "express";
import {
  addJob,
  deleteJob,
  getAllJobs,
  updateJob,
  viewJob,
} from "../controllers/job.controller.js";
import {
  jobCreationRules,
  jobDeletionRules,
  jobUpdateRules,
} from "../schemas/job.validation.js";

const router = Router();

router.get("/view-job/:id", viewJob);
router.get("/get-all-jobs", getAllJobs);
router.post("/add-job", jobCreationRules, addJob);
router.put("/update-job/:id", updateJob);
router.put("/update-job", (req, res) => {
  res
    .status(400)
    .json({ message: "Id is required in URL path, e.g. /update-job/:id" });
});
router.delete("/delete-job/:id", jobDeletionRules, deleteJob);
router.delete("/delete-job", (req, res) => {
  res
    .status(400)
    .json({ message: "Id is required in URL path, e.g. /delete-job/:id" });
});

export default router;
