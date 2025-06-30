import { body } from "express-validator";

export const profileValidationRules = [
  body("userId").notEmpty().withMessage("User id is required."),
  body("username").optional(),
  body("location").optional(),
  body("position").optional(),
  body("aboutMe").optional(),
  body("experience").optional(),
  body("skills").optional(),
  body("resume").optional(),
];
