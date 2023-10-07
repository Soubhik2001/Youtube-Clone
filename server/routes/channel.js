const express = require("express");
const router = express.Router();
const{addChannel,getChannels} = require("../controllers/channel");
const {verifyToken} = require("../middleware/verifyToken");

router.post('/add',verifyToken, addChannel);
router.get('/get',getChannels);

module.exports = router;