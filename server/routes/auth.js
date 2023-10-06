const express = require("express");
const { registerUser, loginUser, resetPassword } = require("../controllers/auth.js");

const router = express.Router();



router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset",resetPassword);
module.exports = router;
