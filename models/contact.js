const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const {
  addSchema,
  changeFavoriteSchema,
} = require("../schemas/schemaContacts");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);
const schemas = { addSchema, changeFavoriteSchema };

module.exports = { Contact, schemas };
