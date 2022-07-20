import { Request, Response } from "express";
import { CreateUserData } from "../repositories/userRepository.js";
import { addNewUser } from "../services/authService.js";

export async function signUpUser(req: Request, res: Response) {
  const userData: CreateUserData = res.locals.body;
  await addNewUser(userData);

  res.sendStatus(201);
}
