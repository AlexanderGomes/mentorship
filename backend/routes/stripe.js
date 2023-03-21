const express = require("express");
const router = express.Router();

const { verifyIdendity, verifyIdendityHook } = require("../controllers/stripe");

router.post("/create-verification-session", verifyIdendity);
router.post("/webhook", express.raw({ type: "application/json" }),verifyIdendityHook);

module.exports = router;
