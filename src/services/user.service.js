import { User } from "../models/user.model.js";
import { createUser, getUser } from "../databases/user.repository.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const createUserService = async (data) => {
  const { name, email, password } = data.body;
  const encryptedPassword = await User.encryptPassword(password);
  const newUser = new User({ name, email, password: encryptedPassword });
  const userToGetToken = await createUser(newUser);
  return jwt.sign({ id: userToGetToken._id }, process.env.SECRET);
};

export const validateUserService = async (req, res) => {
  try {
    
    const { name, email, password } = req.body;
    const userFound = await getUser({ email });

    if (!userFound) {
        res.status(400).json({ message: "User not found!" });
    }

    const isPasswordEqual = await User.verifyPassword(password, userFound.password );

    if (!isPasswordEqual) {
        res.status(401).json({ message: "Unauthorized" });
    }

    const token = jwt.sign({id: userFound._id}, process.env.SECRET)
    return res.status(200).json(token)

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
