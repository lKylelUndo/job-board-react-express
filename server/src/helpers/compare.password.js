import bcrypt from "bcrypt";

export const comparePassword = async (password, hashedPasword) => {
  try {
    return await bcrypt.compare(password, hashedPasword);
  } catch (error) {
    console.log(error);
  }
};
