const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

const ctrl = require("../../controllers/users");

const { validateBody, authenticate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { schemasUsers } = require("../../models");

router.post(
  "/register",
  validateBody(schemasUsers.joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(schemasUsers.joiLoginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.current));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch("/update", authenticate, ctrlWrapper(ctrl.updateSubscription));

router.patch(
  "/avatars",
  authenticate,
  uploadMiddleware.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
