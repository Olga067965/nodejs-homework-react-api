const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getAllContacts);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateContact);
router.patch(
  "/:id/favorite",
  validateBody(schemas.addSchema),
  ctrl.updateFavorite
);

router.delete("/:contactId", ctrl.deleteContact);

module.exports = router;
