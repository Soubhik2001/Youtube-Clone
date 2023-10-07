const express = require("express");
const router = express.Router();
const  {uploadVideo,getVideos} = require('../controllers/video');

router.post('/upload',uploadVideo);
router.get('/get',getVideos);

module.exports = router;