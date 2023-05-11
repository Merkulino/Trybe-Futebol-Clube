import Joi = require('joi');

type loginInput = { email: string, password: string };

const loginInputSchema = (body: loginInput) => Joi.object({
  email: Joi.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
  password: Joi.string().min(6).required(),
}).validate(body);

export default loginInputSchema;
