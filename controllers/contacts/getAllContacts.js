const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers/index");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = ctrlWrapper(getAllContacts);
