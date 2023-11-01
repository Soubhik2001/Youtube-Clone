const express = require("express");
const { registerUser, loginUser, resetPassword,googleLogin } = require("../controllers/auth.js");

const router = express.Router();



router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset",resetPassword);
router.post("/google-login", googleLogin);
module.exports = router;
