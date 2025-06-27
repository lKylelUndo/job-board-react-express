import { User } from "../models/User.js";
import { Job } from "../models/Job.js";

import { db } from "./Database.js";

const sequelize = db.getSequelizeInstance();

const migrate = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log(`All tables have been created or truncated.`);
    await sequelize.close();
  } catch (error) {
    console.log(error);
  }
};

migrate();
