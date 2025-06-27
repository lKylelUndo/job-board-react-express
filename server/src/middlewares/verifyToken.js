import "dotenv/config";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "Unauthorized: No token found" });

    console.log(token);

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, decoded) => {
      if (error)
        return res.status(401).json({ message: "Error occured invalid token" });

      req.currentUser = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error on verifying token" });
  }
};
