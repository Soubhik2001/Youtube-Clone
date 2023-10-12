const express = require("express");
const router = express.Router();

const {verifyToken} = require("../middleware/verifyToken");
const {getVideosFromSubscribedChannels, getAllVideos, getLikedVideos} = require("../controllers/user");

router.get('/getVideosFromSubscribedChannels', verifyToken, getVideosFromSubscribedChannels);
router.get('/getAllVideos', getAllVideos);
router.get('/getLikedVideos', verifyToken, getLikedVideos);

module.exports = router;