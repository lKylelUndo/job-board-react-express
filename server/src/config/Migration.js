import "../models/Associations.js";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { Job } from "../models/Job.js";
import { Application } from "../models/Application.js";
import { Employeer } from "../models/Employeer.js";

import { db } from "./Database.js";

const sequelize = db.getSequelizeInstance();

const migrate = async () => {
  try {
    // await sequelize.sync({ alter: true });
    // console.log(`All tables have been created or truncated.`);
    // console.log("Employeer associations:", Object.keys(Employeer.associations));
    // console.log("User associations:", Object.keys(User.associations));
    const hashed = await bcrypt.hash("admin123", 10);
    await User.create({
      username: "Kyle Ando",
      email: "ando@yahoo.com",
      password: hashed,
      isAdmin: true,
    });
    await sequelize.close();
  } catch (error) {
    console.log(error);
  }
};

migrate();
