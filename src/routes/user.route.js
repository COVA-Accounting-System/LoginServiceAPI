import { Router } from "express";
import { createUserService, getAllUsersService } from "../services/user.service.js";

const router = Router();

router.post("/createAccount", async (req, res) => {
    try{
        const newUser = await createUserService(req)
        return res.json(newUser);
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
})

router.get("/getUsers", async (req, res) => {
    try{
        const users = await getAllUsersService(req)
        return res.json(users);
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
})

export default router