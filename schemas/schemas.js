const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const changeFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const joiRegisterSchema = Joi.object({
  password: Joi.string().alphanum().min(6).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().alphanum().min(6).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
});

const updateAvatarSchema = Joi.object({
  avatarURL: Joi.string().required(),
});

module.exports = {
  addSchema,
  changeFavoriteSchema,
  joiLoginSchema,
  joiRegisterSchema,
  updateAvatarSchema,
};
