const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken');
const {getNotification, deleteNotificationById} = require('../controllers/notification');

router.get('/getNotification',verifyToken,getNotification);
router.delete('/deleteNotification/:notificationId',verifyToken,deleteNotificationById);

module.exports = router;