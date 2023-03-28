const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const getUserProfileData = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -_id");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: 'user not found' });
  }
});

const upadteUserProfile = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
});


module.exports = {
  upadteUserProfile,
  getUserProfileData,
};
