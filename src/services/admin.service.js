import { Admin } from "../models/admin.model.js";
import { createAdmin, getAdmin } from "../databases/admin.repository.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();


export const createAdminService = async (data) => {
  const { name, email, password } = data.body;
  const encryptedPassword = await Admin.encryptPassword(password);
  const newAdmin = new Admin({ name, email, password: encryptedPassword });
  const userToGetToken = await createAdmin(newAdmin);
  return jwt.sign({ id: userToGetToken._id }, process.env.SECRET);
};

export const validateAdminService = async (req, res) => {
  try {
    
    const { name, email, password } = req.body;
    const adminFound = await getAdmin({ email });

    if (!adminFound) {
       return res.status(400).json({ message: "Admin not found!" });
    }

    const isPasswordEqual = await Admin.verifyPassword(password, adminFound.password );

    if (!isPasswordEqual) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = jwt.sign({id: adminFound._id}, process.env.SECRET)
    return res.status(200).json({token: token})

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
