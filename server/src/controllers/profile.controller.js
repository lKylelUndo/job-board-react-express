import { validationResult, matchedData } from "express-validator";
import { Profile } from "../models/Profile.js";

export const fetchProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log(`User id ${userId}`);

    const profile = await Profile.findOne({ where: { userId } });
    if (!profile) return res.status(400).json({ message: "No profile found." });

    return res.status(200).json({ profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const addProfile = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(401).json({ errors: result.array() });

    const data = matchedData(req);
    console.table(data);

    const profile = await Profile.create(data);
    if (!profile) return res.status(401).json({ message: "Failed" });

    return res.status(200).json({ message: "Success", profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { userId, ...rest } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    const updated = await Profile.update(rest, { where: { userId } });

    if (!updated[0]) {
      return res.status(400).json({ message: "Failed to update profile" });
    }

    return res
      .status(200)
      .json({ message: "Profile updated successfully", updated });
  } catch (error) {
    console.log("Edit profile error:", error);
    return res.status(500).json({ error });
  }
};
