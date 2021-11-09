const { Joi } = require("express-validation");

const requestSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = requestSchema;
