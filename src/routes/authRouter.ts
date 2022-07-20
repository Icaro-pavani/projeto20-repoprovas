import { Router } from "express";

import { signInUser, signUpUser } from "../controllers/authController.js";
import validSchema from "../middlewares/validSchema.js";
import userSchema from "../schemas/userSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validSchema(userSchema), signUpUser);
authRouter.post("/sign-in", validSchema(userSchema), signInUser);

export default authRouter;
