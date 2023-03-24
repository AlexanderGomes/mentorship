const express = require("express");
const router = express.Router();

const { upadteUserProfile } = require("../controllers/user");


router.put("/update/:userId", upadteUserProfile);


module.exports = router;
