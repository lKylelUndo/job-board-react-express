import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = async (user) => {
  try {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "1d" }
    );
  } catch (error) {
    console.log(error);
  }
};
