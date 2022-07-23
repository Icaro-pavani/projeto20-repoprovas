import Joi from "joi";

export interface Code {
  code: string;
}

const authenticateSchema = Joi.object<Code>({
  code: Joi.string().required(),
});

export default authenticateSchema;
