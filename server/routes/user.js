const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/verifyToken");
const {
  getVideosFromSubscribedChannels,
  getAllVideos,
  getLikedVideos,
  getSubscriptions,
  getAllChannels,
  getUserProfile,
  updateUserProfile,
  trendingVideos,
  getVideo,
  myChannel,
} = require("../controllers/user");

router.get(
  "/getVideosFromSubscribedChannels",
  verifyToken,
  getVideosFromSubscribedChannels
);
router.get("/getAllVideos", getAllVideos);
router.get("/getLikedVideos", verifyToken, getLikedVideos);
router.get("/getSubscriptions", verifyToken, getSubscriptions);
router.get("/getAllChannels", getAllChannels);
router.get("/getProfile", verifyToken, getUserProfile);
router.patch("/updateProfile", verifyToken, updateUserProfile);
router.get("/getTrendingVideos", trendingVideos);
router.get("/getVideo/:videoId", verifyToken, getVideo);
router.get("/myChannel", verifyToken, myChannel);

module.exports = router;
