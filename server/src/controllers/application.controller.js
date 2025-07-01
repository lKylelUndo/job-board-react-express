import { Application } from "../models/Application.js";

export const getAllApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const jobs = await Application.findAll({ where: { userId: id } });
    if (!jobs)
      return res.status(400).json({ message: "No applied jobs found" });

    return res.status(200).json({ jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const addApplication = async (req, res) => {
  try {
    const job = req.body;
    console.log(job);
    const apply = await Application.create(job);
    if (!apply) return res.status(400).json({ message: "Failed" });

    return res.status(200).json({ message: "Success", apply });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
