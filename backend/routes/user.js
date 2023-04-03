const express = require("express");
const router = express.Router();

const {
  updateUserProfile,
  getUserProfileData,
  createProject,
  updateProject,
  getProject,
  deleteProject,
  createWork,
  updateWork,
  deleteWork,
  getWork,
  searchUsers,
} = require("../controllers/user");

const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/get/profile/:id", getUserProfileData);
router.get("/search", searchUsers);
router.get("/project/:id", getProject);
router.get("/work/:id", getWork);
router.put("/update/profile", updateUserProfile);
router.put("/project/edit", updateProject);
router.put("/work/edit", updateWork);
router.post("/create/work", createWork);
router.post("/project/create", createProject);
router.delete("/project/delete/:id", deleteProject);
router.delete("/:id", deleteWork);

module.exports = router;
