const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const {
  joiRegisterSchema,
  joiLoginSchema,
  updateAvatar,
} = require("../schemas/schemas");

const userSchema = new Schema({
  password: {
    type: String,
    minlength: 6,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    required: true,
  },
});

userSchema.post("save", handleMongooseError);

const schemasUsers = {
  joiRegisterSchema,
  joiLoginSchema,
  updateAvatar,
};

const User = model("user", userSchema);

module.exports = { User, schemasUsers };
