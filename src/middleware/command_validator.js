const Joi = require("joi");

const validateCommand = async (args) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(args);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = validateCommand;
