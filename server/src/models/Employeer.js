import { DataTypes } from "sequelize";
import { User } from "./User.js";
import { db } from "../config/Database.js";

const sequelize = db.getSequelizeInstance();

export const Employeer = sequelize.define(
  "Employeer",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aboutCompany: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companySize: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    isRegistered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "employeers",
  }
);
