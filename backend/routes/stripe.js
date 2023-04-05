const express = require("express");
const router = express.Router();

const {
  createStripeAccount,
  verifyIdendityHook,
} = require("../controllers/stripe");

router.post("/create", createStripeAccount);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  verifyIdendityHook
);

module.exports = router;
