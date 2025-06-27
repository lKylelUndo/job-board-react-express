import { User } from "../models/User.js";

export const autheticateUser = async (user) => {
  try {
    return await User.findOne({ where: { email: user.email } });
  } catch (error) {
    console.log(error);
  }
};
