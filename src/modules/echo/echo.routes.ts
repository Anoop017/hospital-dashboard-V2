import { Router } from "express";
import { validateBody } from "../../shared/validation/validateBody.js";
import { echoSchema } from "./echo.schema.js";
import { echoController } from "./echo.controller.js";

const router = Router();

router.post("/echo", validateBody(echoSchema), echoController);

export default router;