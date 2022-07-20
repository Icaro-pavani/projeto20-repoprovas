import { User } from "@prisma/client";
import Joi from "joi";

export type ValidLoginData = Omit<User, "id">;

const loginUserSchema = Joi.object<ValidLoginData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default loginUserSchema;
