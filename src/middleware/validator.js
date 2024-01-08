const joi = require("joi");
const validate = require("koa-joi-validate");

const validator = {
  loginValidator: validate({
    body: {
      email: joi.string().email().required(),
      password: joi.string().min(4).required(),
    },
  }),

  paramsValidator: validate({
    params: {
      id: joi.number().integer(),
      specializationId: joi.number().integer(),
      schoolId: joi.number().integer(),
    },

    query: {
      parentId: joi.number().integer(),
      view: joi.string(),
      root: joi.boolean(),
      page: joi.number().integer(),
      pageSize: joi.number().integer(),
      keywords: joi.string().min(3),
    },
  }),

  specializationValidator: validate({
    body: {
      specializationName: joi.string().required(),
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

  vacancyValidator: validate({
    query: {
      specialization: joi.string(),
      location: joi.string(),
      page: joi.number().integer(),
      pageSize: joi.number().integer(),
    },
  }),
};

module.exports = validator;
