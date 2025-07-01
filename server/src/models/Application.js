import { db } from "../config/Database.js";
import { DataTypes } from "sequelize";

const sequelize = db.getSequelizeInstance();

export const Application = sequelize.define(
  "Application",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
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
  },
  {
    tableName: "applications",
    timestamps: true,
  }
);
