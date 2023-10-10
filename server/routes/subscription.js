const express = require("express");
const router = express.Router();

const {verifyToken} = require('../middleware/verifyToken');
const {addSubscription, deleteSubscription, getSubscribersByChannel, getSubscribersByUser} = require("../controllers/subscription");


router.post('/add/:channelId',verifyToken, addSubscription);
router.delete('/delete/:channelId', verifyToken, deleteSubscription);
router.get('/getSubscribersByChannel/:channelId',verifyToken, getSubscribersByChannel);
router.get('/getSubscribersByUser/:userId', verifyToken, getSubscribersByUser);

module.exports = router;