import { Router } from "express";
import { profileValidationRules } from "../schemas/profile.validation.js";
import { addProfile, editProfile, fetchProfile } from "../controllers/profile.controller.js";

const router = Router();

router.get("/get-profile/:userId", fetchProfile);
router.post("/add-profile", profileValidationRules, addProfile);
router.put("/edit-profile", editProfile)

export default router;
