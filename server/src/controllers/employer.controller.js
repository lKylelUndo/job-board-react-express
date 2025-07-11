import { Employeer } from "../models/Employeer.js";
import { User } from "../models/User.js";

export const verifyEmployeer = async (req, res) => {
  try {
    const { id } = req.params;

    const findEmployeer = await Employeer.findOne({
      where: {
        userId: id,
        isRegistered: true,
      },
    });
    if (!findEmployeer)
      return res.status(400).json({ message: "Employeer not verified." });

    return res.status(200).json({ message: "Verified" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const deniedEmployeerApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const employeer = await Employeer.destroy({ where: { userId: id } });
    if (!empployeer)
      return res.status(400).json({ message: "No employeer found." });

    return res.status(200).json({ message: "Deleted." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const acceptEmployeerApplication = async (req, res) => {
  try {
    const employeer = req.body;
    employeer.isRegistered = true;
    const { userId } = req.body;

    const currentEmployeer = await Employeer.update(employeer, {
      where: { userId },
    });

    if (!currentEmployeer)
      return res.status(400).json({ message: "No employer found." });

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const fetchPendingEmployeerWithUser = async (req, res) => {
  try {
    const pendingEmployeers = await Employeer.findAll({
      where: { isRegistered: false },
    });

    if (!pendingEmployeers.length) {
      return res.status(404).json({ message: "No pending employeers found." });
    }

    const userIds = pendingEmployeers.map((emp) => emp.userId);

    const users = await User.findAll({
      where: { id: userIds },
      attributes: ["id", "username", "email"],
    });

    const userMap = new Map(users.map((user) => [user.id, user]));

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
