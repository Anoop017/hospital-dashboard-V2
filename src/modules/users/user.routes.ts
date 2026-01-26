import { Router } from "express";
import { getUserByIdController } from "./user.controller.js";

const router = Router();

router.get("/users/:id", getUserByIdController);

export default router;