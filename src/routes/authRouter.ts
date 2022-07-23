import { Router } from "express";

import {
  signInUser,
  signInWithGitHub,
  signUpUser,
} from "../controllers/authController.js";
import validSchema from "../middlewares/validSchema.js";
import authenticateSchema from "../schemas/authenticateSchame.js";
import loginUserSchema from "../schemas/loginUserSchema.js";
import signUpUserSchema from "../schemas/signUpUserSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validSchema(signUpUserSchema), signUpUser);
authRouter.post("/sign-in", validSchema(loginUserSchema), signInUser);
authRouter.post(
  "/authenticate",
  validSchema(authenticateSchema),
  signInWithGitHub
);

export default authRouter;
