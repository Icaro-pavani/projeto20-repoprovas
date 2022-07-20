import { Router } from "express";

import { signUpUser } from "../controllers/authController.js";
import validSchema from "../middlewares/validSchema.js";
import userSchema from "../schemas/userSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validSchema(userSchema), signUpUser);

export default authRouter;
