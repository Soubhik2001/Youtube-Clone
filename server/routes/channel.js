const express = require("express");
const router = express.Router();
const{addChannel, getChannels, deleteChannel} = require("../controllers/channel");
const {verifyToken} = require("../middleware/verifyToken");

router.post('/add',verifyToken, addChannel);
router.get('/get',getChannels);
router.delete('/delete/:channelId',verifyToken, deleteChannel)

module.exports = router;