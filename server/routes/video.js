const express = require("express");
const router = express.Router();
const  {uploadVideo,getVideos, deleteVideo} = require('../controllers/video');
const {verifyToken} = require("../middleware/verifyToken");

router.post('/upload',verifyToken, uploadVideo);
router.get('/get',getVideos);
// router.delete('/delete/:id',verifyToken, deleteVideo);

module.exports = router;