import { Router } from "express";
import { createUserService } from "../services/user.service.js";

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


export default router