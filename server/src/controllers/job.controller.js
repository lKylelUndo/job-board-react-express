import { validationResult, matchedData } from "express-validator";
import { Job } from "../models/Job.js";

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    if (!jobs) return res.status(401).json({ message: "No jobs at the moment" });

    return res.status(200).json({ jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const viewJob = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(401).json({ message: "Id is required." });

    const find = await Job.findOne({ where: { id } });
    if (!find) return res.status(404).json({ message: "No job found." });

    return res.status(200).json({ find });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const addJob = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const data = matchedData(req);

    console.table(data);
    const created = await Job.create(data);
    if (!created)
      return res.status(400).json({ message: "Error on creating job" });

    return res
      .status(200)
      .json({ message: "Successfully created job", created });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(401).json({ message: "Id is required." });

    console.table(req.body);

    const updated = await Job.update(req.body, { where: { id } });
    if (!updated)
      return res.status(400).json({ message: "Error on updating job" });

    return res
      .status(200)
      .json({ message: "Successfully updated job", updated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result) return res.status(401).json({ errors: result.array() });

    const data = matchedData(req);
    console.table(data);

    const deleted = await Job.destroy({ where: { id: data.id } });
    if (!deleted) {
      return res.status(404).json({ message: "Job not found." });
    }

    return res
      .status(200)
      .json({ message: "Job successfully deleted.", deleted });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
