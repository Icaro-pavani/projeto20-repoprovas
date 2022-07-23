import bcrypt from "bcrypt";
import axios from "axios";
import { faker } from "@faker-js/faker";

import {
  conflictError,
  notFoundError,
} from "../middlewares/handleErrorsMiddleware.js";
import * as userRepository from "../repositories/userRepository.js";
import { ValidLoginData } from "../schemas/loginUserSchema.js";
import tokenAPI from "../utils/tokenAPI.js";

export async function addNewUser(userData: userRepository.CreateUserData) {
  const SALT: number = 10;
  const registeredUser = await userRepository.findByEmail(userData.email);

  if (!!registeredUser) {
    throw conflictError("This e-mail has already been registered!");
  }

  userData.password = bcrypt.hashSync(userData.password, SALT);
  delete userData.passwordConfirmation;
  await userRepository.createUser(userData);
}

export async function loginUser(userData: ValidLoginData) {
  const user = await userRepository.findByEmail(userData.email);

  if (!user) {
    throw notFoundError("No user registered with this e-mail!");
  }

  if (!bcrypt.compareSync(userData.password, user.password)) {
    throw conflictError("Wrong password!");
  }

  return tokenAPI.generateToken(user.id);
}

export async function loginByGitHub(code: string) {
  const data = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    code,
  };

  const SALT = 10;

  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    data,
    {
      headers: { Accept: "application/json" },
    }
  );

  const getUserInfo = await axios.get("https://api.github.com/user/emails", {
    headers: { Authorization: `token ${response.data.access_token}` },
  });
  const userEmail = getUserInfo.data[0].email;

  const user = await userRepository.findByEmail(userEmail);
  if (!user) {
    const gitUser = await userRepository.findByEmail("@gb-" + userEmail);
    if (!gitUser) {
      const userData = {
        email: `@gb-${userEmail}`,
        password: bcrypt.hashSync(faker.internet.password(), SALT),
      };
      const createdUser = await userRepository.createUser(userData);
      console.log(createdUser);
      return tokenAPI.generateToken(createdUser.id);
    }
    return tokenAPI.generateToken(gitUser.id);
  }
  return tokenAPI.generateToken(user.id);
}
