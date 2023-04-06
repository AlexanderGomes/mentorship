const express = require("express");
const router = express.Router();

const { createStripeAccount } = require("../controllers/stripe");

router.post("/create", createStripeAccount);

module.exports = router;
