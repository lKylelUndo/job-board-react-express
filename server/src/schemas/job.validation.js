import { body, param } from "express-validator";

export const jobCreationRules = [
  body("jobTitle").notEmpty().withMessage("Job title is required."),
  body("jobDescription").notEmpty().withMessage("Job description is required."),
  body("jobLocation").notEmpty().withMessage("Job location is required."),
  body("jobType").notEmpty().withMessage("Job type is required."),
  body("jobSalary").notEmpty().withMessage("Job salary is required."),
];

export const jobUpdateRules = [];

export const jobDeletionRules = [
  param("id")
    .notEmpty()
    .withMessage("Missing paratmer ID.")
    .isNumeric()
    .withMessage("Must be a number"),
];
