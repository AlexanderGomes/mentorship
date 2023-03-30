const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const service = require("../functionality/profile");

const getUserProfileData = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -_id");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "user not found" });
  }
});

const upadteUserProfile = asyncHandler(async (req, res) => {
  const { userId, profilePic } = req.body.data;

  let newPicture;

  if (profilePic) {
    newPicture = await service.uploadPhoto(profilePic, userId);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body.data, profilePicture: newPicture && newPicture },
      { new: true }
    ).select("-password -_id");
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
});

module.exports = {
  upadteUserProfile,
  getUserProfileData,
};
