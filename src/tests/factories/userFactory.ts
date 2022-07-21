import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import { prisma } from "../../config/database.js";

function createSignUp(email = "teste@gmail.com", passwordLength = 12) {
  const password = faker.internet.password(passwordLength);
  return {
    email,
    password,
    passwordConfirmation: password,
  };
}

interface SignUp {
  email: string;
  password: string;
  passwordConfirmation: string;
}

async function createUser(signUp: SignUp) {
  delete signUp.passwordConfirmation;
  const user = await prisma.user.create({
    data: {
      email: signUp.email,
      password: bcrypt.hashSync(signUp.password, 10),
    },
  });

  return { ...user, plainPassword: signUp.password };
}

const userFactory = { createSignUp, createUser };

export default userFactory;
