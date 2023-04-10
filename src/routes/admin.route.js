import { Router } from "express";
import { createAdminService, validateAdminService } from "../services/admin.service.js";

const router = Router();

router.post("/createAdminAccount", async (req, res) => {
    try{
        const newAdmin = await createAdminService(req)
        return res.json(newAdmin);
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
})


export default router