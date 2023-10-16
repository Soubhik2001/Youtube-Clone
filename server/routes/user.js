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
} = require("../controllers/user");

router.get(
  "/getVideosFromSubscribedChannels",
  verifyToken,
  getVideosFromSubscribedChannels
);
router.get("/getAllVideos", getAllVideos);
router.get("/getLikedVideos", verifyToken, getLikedVideos);
router.get("/getSubscriptions", verifyToken, getSubscriptions);
router.get("/getAllChannels", verifyToken, getAllChannels);
router.get("/getProfile", verifyToken, getUserProfile);
router.patch("/updateProfile", verifyToken, updateUserProfile);
router.get("/getTrendingVideos", trendingVideos);

module.exports = router;
