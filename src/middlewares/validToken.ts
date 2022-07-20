import { NextFunction, Request, Response } from "express";

import * as userRepository from "../repositories/userRepository.js";
import tokenAPI, { TokenDecrypt } from "../utils/tokenAPI.js";

export default async function validToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token: string = req.headers.authorization
      .replace("Bearer ", "")
      .trim();

    if (!token) {
      return res.status(422).send("Missing Token Information!");
    }

    const userInfo = (await tokenAPI.decryptToken(token)) as TokenDecrypt;
    const user = await userRepository.findById(userInfo.id);
    if (!user) {
      return res
        .status(409)
        .send("Token doesn't have information of a valid user!");
    }
  } catch (error) {
    return res.status(401).send("Invalid Token Information!");
  }

  next();
}
