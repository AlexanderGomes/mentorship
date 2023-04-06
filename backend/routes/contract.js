const express = require("express");
const router = express.Router();

const { createContract, Decide, getAll } = require("../controllers/contract");

router.post("/", createContract);
router.post("/choice/:id", Decide);
router.get("/get", getAll);

module.exports = router;
