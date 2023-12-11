const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/auth");
const { validateBody, authenticate } = require("../middlewares");
const { ctrlWrapper } = require("../helpers");
const { registerSchema, loginSchema } = require("../schemas/schemaUsers");

router.post(
  "/register",
  validateBody(registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validateBody(loginSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.current));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch("/update", authenticate, ctrlWrapper(ctrl.updateSubscription));

module.exports = router;
