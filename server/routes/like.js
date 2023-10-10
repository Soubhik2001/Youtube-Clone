const express = require("express");
const router = express.Router();

const {verifyToken} = require('../middleware/verifyToken');
const {addLike, addDislike, deleteLike, deleteDislike, getLikesByVideoId, getDislikesByVideoId} = require('../controllers/like');

router.post('/addLike', verifyToken, addLike);
router.post('/addDislike', verifyToken, addDislike);
router.delete('/deleteLike', verifyToken, deleteLike);
router.delete('/deleteDislike', verifyToken, deleteDislike);
router.get('/getLikesByVideoId/:videoId', verifyToken, getLikesByVideoId);
router.get('/getDislikesByVideoId/:videoId', verifyToken, getDislikesByVideoId);

module.exports = router;

