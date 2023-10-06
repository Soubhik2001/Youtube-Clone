const express = require("express");
const router = express.Router();
const  {uploadVideo} = require('../controllers/video');

router.post('/upload',uploadVideo);

module.exports = router;