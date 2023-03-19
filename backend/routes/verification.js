const express = require("express");
const router = express.Router();

const { verifyIdendity } = require("../controllers/verification");

const { protect } = require("../middleware/authMiddleware");

router.post("/", verifyIdendity);

module.exports = router;
