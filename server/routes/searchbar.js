const express = require("express");
const router = express.Router();

const {searchVideos, searchChannels} = require("../controllers/searchbar");

router.get("/searchVideos", searchVideos);
router.get("/searchChannels", searchChannels);

module.exports = router;