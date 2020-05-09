const Joi = require("@hapi/joi");

//Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
  });

  return schema.validate(data);
};

//Login Validation
const LoginValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
  });

  return schema.validate(data);
};

module.exports.LoginValidation = LoginValidation;
module.exports.registerValidation = registerValidation;
