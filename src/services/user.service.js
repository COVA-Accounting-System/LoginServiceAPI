import { User } from "../models/user.model.js";
import { createUser, getUser, getUsers } from "../databases/user.repository.js";
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

export const getAllUsersService = async () => {
  return await getUsers();
};

export const validateUserService = async (req, res) => {
  try {
    
    const { name, email, password } = req.body;
    const userFound = await getUser({ email });

    if (!userFound) {
       return res.status(400).json({ message: "User not found!" });
    }

    const isPasswordEqual = await User.verifyPassword(password, userFound.password );

    if (!isPasswordEqual) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = jwt.sign({id: userFound._id}, process.env.SECRET)
    return res.status(200).json({token: token})

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
