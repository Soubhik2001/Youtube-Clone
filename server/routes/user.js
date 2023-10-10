const express = require("express");
const router = express.Router();

const {verifyToken} = require("../middleware/verifyToken");
const {getVideosFromSubscribedChannels} = require("../controllers/user");

router.get('/getVideosFromSubscribedChannels', verifyToken, getVideosFromSubscribedChannels);

module.exports = router;