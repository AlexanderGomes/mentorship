const express = require("express");
const router = express.Router();

const {
  updateUserProfile,
  getUserProfileData,
  createProject,
  updateProject,
  getProject,
  deleteProject,
} = require("../controllers/user");

const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/get/profile/:id", getUserProfileData);
router.get("/project/:id", getProject);
router.put("/update/profile", updateUserProfile);
router.put("/project/edit", updateProject);
router.post("/project/create", createProject);
router.delete("/project/delete/:id", deleteProject);

module.exports = router;
