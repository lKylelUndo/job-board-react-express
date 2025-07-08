import { User } from "../models/User.js";

export const fetchAllCandidates = async (req, res) => {
  try {
    const candidates = await User.findAll({ where: { isAdmin: false } });
    if (!candidates)
      return res.status(400).json({ message: "No candidates at the moment" });

    return res.status(200).json({candidates})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
