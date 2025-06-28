import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { Job } from "../models/Job.js";

import { db } from "./Database.js";

const sequelize = db.getSequelizeInstance();

const migrate = async () => {
  try {
    // await sequelize.sync({ force: true });
    // console.log(`All tables have been created or truncated.`);
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
