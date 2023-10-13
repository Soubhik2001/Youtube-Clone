const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/verifyToken");
const {
  getVideosFromSubscribedChannels,
  getAllVideos,
  getLikedVideos,
  getSubscriptions,
  getAllChannels,
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


module.exports = router;
