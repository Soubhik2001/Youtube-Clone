const express = require("express");
const router = express.Router();

const {searchVideos, searchChannels} = require("../controllers/searchbar");

router.post("/searchVideos", searchVideos);
router.post("/searchChannels", searchChannels);

module.exports = router;