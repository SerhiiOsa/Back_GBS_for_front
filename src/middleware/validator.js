const joi = require("joi");
const validate = require("koa-joi-validate");

const validator = {
  loginValidator: validate({
    body: {
      email: joi.string().email().required(),
      password: joi.string().min(4).required(),
    },
  }),

  tokenValidator: validate({
    header: {
      Authorization: joi.string().required(),
    },
  }),

  nodeValidator: validate({
    body: {
      nodeName: joi.string().required(),
      description: joi.string().required(),
    },
  }),
};

module.exports = validator;
