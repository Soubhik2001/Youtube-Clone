const express = require("express");
const router = express.Router();
const{addComment, getCommentByVideoId, deleteComment, updateComment} = require("../controllers/comment");
const {verifyToken} = require("../middleware/verifyToken");

router.post('/add',verifyToken, addComment);
router.get('/videos/:videoId',getCommentByVideoId);
router.delete('/:commentId',verifyToken, deleteComment);
router.patch('/:commentId',verifyToken, updateComment);

module.exports = router;