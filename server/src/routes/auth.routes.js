import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller.js";
import {
  loginValidationRules,
  registerValidationRules,
} from "../schemas/auth.validation.js";

const router = Router();

router.post("/register", registerValidationRules, registerUser);
router.post("/login", loginValidationRules, loginUser);
router.post("/logout", logoutUser);

export default router;
