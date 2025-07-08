import { Employeer } from "../models/Employeer.js";

export const applyEmployer = async (req, res) => {
  try {
    const data = req.body;

    const existingUser = await Employeer.findOne({
      where: { userId: data.userId },
    });
    if (existingUser)
      return res.status(400).json({ message: "Employer already registered." });

    data.isRegistered = true;

    console.table(data);

    const result = await Employeer.create(data);
    console.log(result);

    return res.status(201).json({ message: "Success Register", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
