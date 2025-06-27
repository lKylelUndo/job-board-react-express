import { DataTypes } from "sequelize";
import { db } from "../config/Database.js";

const sequelize = db.getSequelizeInstance();

export const Job = sequelize.define("Job", {
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobSalary: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    tableName: "jobs",
    timestamps: true
});
