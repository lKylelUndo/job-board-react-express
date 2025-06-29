import { validationResult, matchedData } from "express-validator";
import { User } from "../models/User.js";
import { hashPassword } from "../helpers/password-hash.js";
import { autheticateUser } from "../helpers/find-user.js";
import { comparePassword } from "../helpers/compare.password.js";
import { generateToken } from "../helpers/generateToken.js";

export const loginUser = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).json({ errors: result.array() });

    const data = matchedData(req);
    console.table(data);

    const user = await autheticateUser(data);
    if (!user)
      return res.status(401).json({
        errors: [{ path: "email", msg: "Email is not yet registered" }],
      });
    if (!(await comparePassword(data.password, user.password)))
      return res
        .status(401)
        .json({ errors: [{ path: "password", msg: "Incorrect Password" }] });

    const token = await generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 12,
      secure: false,
      SameSite: "None",
    });

    return res.status(200).json({ message: "success", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const registerUser = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(401).json({ errors: result.array() });

    const data = matchedData(req);
    const hashedPasword = await hashPassword(data.password);

    data.password = hashedPasword;
    const newRegistered = await User.create(data);
    if (!registerUser)
      return res.status(400).json({ message: "Registration Failed." });

    return res
      .status(200)
      .json({ message: "Registered Successufully", newRegistered });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      SameSite: "None",
      secure: false,
    });

    res.status(200).json({ message: "Logout succesfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
