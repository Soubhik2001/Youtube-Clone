const express = require("express");
const router = express.Router();
const{addComment} = require("../controllers/comment");
const {verifyToken} = require("../middleware/verifyToken");

router.post('/add',verifyToken, addComment);

module.exports = router;