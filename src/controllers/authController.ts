import { Request, Response } from "express";

import { CreateUserData } from "../repositories/userRepository.js";
import { ValidLoginData } from "../schemas/loginUserSchema.js";
import * as authService from "../services/authService.js";

export async function signUpUser(req: Request, res: Response) {
  const userData: CreateUserData = res.locals.body;
  await authService.addNewUser(userData);

  res.sendStatus(201);
}

export async function signInUser(req: Request, res: Response) {
  const userData: ValidLoginData = res.locals.body;
  const token = await authService.loginUser(userData);

  res.status(200).send({ token });
}
