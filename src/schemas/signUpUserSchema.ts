import Joi from "joi";

import { CreateUserData } from "../repositories/userRepository.js";

const signUpUserSchema = Joi.object<CreateUserData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  passwordConfirmation: Joi.string().valid(Joi.ref("password")).required(),
});

export default signUpUserSchema;
