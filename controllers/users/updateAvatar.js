const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");
const path = require("node:path");
const fs = require("node:fs/promises");
const Jimp = require("jimp");
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Not found photo");
  }
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);

  Jimp.read(tempUpload)
    .then((avatar) => {
      return avatar.resize(250, 250).write(resultUpload);
    })
    .catch((err) => {
      console.error(err);
    });

  await fs.unlink(tempUpload);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
