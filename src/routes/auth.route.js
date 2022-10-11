import { Router } from "express";
import { validateUserService } from "../services/user.service.js";

const router = Router();

router.post("/logIn", validateUserService);

router.get("/", async(req, res) => {
    res.json({message: "endpoint works"})
})

export default router