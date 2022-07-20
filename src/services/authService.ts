import bcrypt from "bcrypt";

import { conflictError } from "../middlewares/handleErrorsMiddleware.js";
import * as userRepository from "../repositories/userRepository.js";

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
