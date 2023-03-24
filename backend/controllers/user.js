const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const upadteUserProfile = asyncHandler(async (req, res) => {
  const { updatedFields } = req.body;

  try {
    const user = User.findById(req.params.userId);

    console.log(updatedFields);
    
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = {
  upadteUserProfile,
};
