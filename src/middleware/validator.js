const joi = require("joi");
const validate = require("koa-joi-validate");

const validator = {
  loginValidator: validate({
    body: {
      email: joi.string().email().required(),
      password: joi.string().min(4).required(),
    },
  }),

  nodeValidator: validate({
    body: {
      nodeName: joi.string().required(),
      description: joi.string().required(),
      extendedDescription: joi.string(),
      parentId: joi.number().integer(),
    },
  }),

  schoolValidator: validate({
    body: {
      schoolName: joi.string().required(),
      description: joi.string().required(),
      link: joi.string().uri().required(),
    },
  }),
};

module.exports = validator;
