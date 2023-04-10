import { Router } from "express";
import { validateAdminService } from "../services/admin.service.js";

const router = Router();

router.post("/logInAdmin", validateAdminService);


export default router



