const express = require("express");
const router = express.Router();

const {
  upadteUserProfile,
  getUserProfileData,
} = require("../controllers/user");

const { protect } = require("../middleware/authMiddleware");

router.get("/get/profile/:id", protect, getUserProfileData);
router.put("/update/profile", upadteUserProfile);

module.exports = router;
