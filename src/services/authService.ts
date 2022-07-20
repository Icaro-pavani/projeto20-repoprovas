import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  conflictError,
  notFoundError,
} from "../middlewares/handleErrorsMiddleware.js";
import * as userRepository from "../repositories/userRepository.js";
import tokenAPI from "../utils/tokenAPI.js";

export async function addNewUser(userData: userRepository.CreateUserData) {
  const SALT: number = 10;
  const registeredUser = await userRepository.findByEmail(userData.email);
  console.log(registeredUser);

  if (!!registeredUser) {
    throw conflictError("This e-mail has already been registered!");
  }

  userData.password = bcrypt.hashSync(userData.password, SALT);
  await userRepository.createUser(userData);
}

export async function loginUser(userData: userRepository.CreateUserData) {
  const user = await userRepository.findByEmail(userData.email);

  if (!user) {
    throw notFoundError("No user registered with this e-mail!");
  }

  if (!bcrypt.compareSync(userData.password, user.password)) {
    throw conflictError("Wrong password!");
  }

  return tokenAPI.generateToken(user.id);
}
