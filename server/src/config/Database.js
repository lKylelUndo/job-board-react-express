import { Sequelize } from "sequelize";
import "dotenv/config";

class Database {
  constructor() {
    this.sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
      }
    );
  }

  async test() {
    try {
      await this.sequelize.authenticate();
      console.log(`success`);
      await this.sequelize.close();
    } catch (error) {
      console.log(error);
    }
  }

  getSequelizeInstance() {
    return this.sequelize;
  }
}

export const db = new Database();

// console.log(typeof process.env.DB_PASSWORD);
