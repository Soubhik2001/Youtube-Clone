const express = require("express");
const router = express.Router();

const {verifyToken} = require('../middleware/verifyToken');
const {addLike, addDislike, deleteLike, deleteDislike} = require('../controllers/like');

router.post('/addLike', verifyToken, addLike);
router.post('/addDislike', verifyToken, addDislike);
router.delete('/deleteLike', verifyToken, deleteLike);
router.delete('/deleteDislike', verifyToken, deleteDislike);

module.exports = router;

