import { Application } from "../models/Application.js";

export const addApplication = async (req, res) => {
  try {
    const job = req.body;
    console.log(job)
    const apply = await Application.create(job);
    if (!apply) return res.status(400).json({ message: "Failed" });

    return res.status(200).json({ message: "Success", apply });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
