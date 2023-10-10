const express = require("express");
const router = express.Router();
const{addChannel, getChannels, deleteChannel, updateChannel} = require("../controllers/channel");
const {verifyToken} = require("../middleware/verifyToken");

router.post('/add',verifyToken, addChannel);
router.get('/get',getChannels);
router.delete('/delete/:channelId',verifyToken, deleteChannel);
router.patch('/update/:channelId', verifyToken, updateChannel);

module.exports = router;