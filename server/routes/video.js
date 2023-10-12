const express = require("express");
const router = express.Router();
const  {uploadVideo, deleteVideo} = require('../controllers/video');
const {verifyToken} = require("../middleware/verifyToken");

router.post('/upload',verifyToken, uploadVideo);

// router.delete('/delete/:id',verifyToken, deleteVideo);

module.exports = router;