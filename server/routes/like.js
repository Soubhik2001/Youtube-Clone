const express = require("express");
const router = express.Router();

const {verifyToken} = require('../middleware/verifyToken');
const {addLike, addDislike, deleteLike, deleteDislike, getLikesByVideoId, getDislikesByVideoId} = require('../controllers/like');

router.post('/addLike/:videoId', verifyToken, addLike);
router.post('/addDislike/:videoId', verifyToken, addDislike);
router.delete('/deleteLike/:videoId', verifyToken, deleteLike);
router.delete('/deleteDislike/:videoId', verifyToken, deleteDislike);
router.get('/getLikesByVideoId/:videoId', verifyToken, getLikesByVideoId);
router.get('/getDislikesByVideoId/:videoId', verifyToken, getDislikesByVideoId);

module.exports = router;

