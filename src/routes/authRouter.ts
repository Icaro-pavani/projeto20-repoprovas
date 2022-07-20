import { Router } from "express";

import { signInUser, signUpUser } from "../controllers/authController.js";
import validSchema from "../middlewares/validSchema.js";
import loginUserSchema from "../schemas/loginUserSchema.js";
import signUpUserSchema from "../schemas/signUpUserSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validSchema(signUpUserSchema), signUpUser);
authRouter.post("/sign-in", validSchema(loginUserSchema), signInUser);

export default authRouter;
