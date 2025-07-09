import { Employeer } from "../models/Employeer.js";
import { User } from "../models/User.js";

export const fetchPendingEmployeerWithUser = async (req, res) => {
  try {
    // Step 1: get pending employeers
    const pendingEmployeers = await Employeer.findAll({
      where: { isRegistered: false },
    });

    if (!pendingEmployeers.length) {
      return res.status(404).json({ message: "No pending employeers found." });
    }

    // Step 2: extract user IDs
    const userIds = pendingEmployeers.map((emp) => emp.userId);

    // Step 3: fetch users based on those IDs
    const users = await User.findAll({
      where: { id: userIds },
      attributes: ["id", "username", "email"],
    });

    // Step 4: create a map for quick lookup
    const userMap = new Map(users.map((user) => [user.id, user]));

    // Step 5: combine employeers and users manually
    const combined = pendingEmployeers.map((emp) => ({
      ...emp.toJSON(),
      user: userMap.get(emp.userId) || null,
    }));

    return res.status(200).json({ employeers: combined });
  } catch (error) {
    console.error("Error in fetchPendingEmployeerWithUser:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const fetchPendingEmployeer = async (req, res) => {
  try {
    const employeers = await Employeer.findAll({
      where: { isRegistered: false },
    });

    if (!employeers || employeers.length === 0) {
      return res.status(404).json({ message: "No pending employeers found." });
    }

    return res.status(200).json({ employeers });
  } catch (error) {
    console.error("Error in fetchPendingEmployeer:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const fetchRegisteredEmployeer = async (req, res) => {
  try {
    const employeers = await Employeer.findAll({
      where: { isRegistered: true },
    });

    if (!employeers)
      return res
        .status(400)
        .json({ message: "No registered employeers at the moment" });

    return res.status(200).json({ employeers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const applyEmployer = async (req, res) => {
  try {
    const data = req.body;
    console.table(data);

    const existingApplication = await Employeer.findOne({
      where: { userId: data.userId },
    });
    if (existingApplication)
      return res.status(400).json({ message: "Employer already submitted." });

    // data.isRegistered = true;

    const result = await Employeer.create(data);
    console.log(result);

    return res.status(201).json({ message: "Submitted", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
