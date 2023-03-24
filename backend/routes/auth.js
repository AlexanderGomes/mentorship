const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  refresh,
  testRoute,
  logout,
} = require("../controllers/auth");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh-token", refresh);
router.post("/logout", logout);
router.get("/protected", protect, testRoute);

module.exports = router;
