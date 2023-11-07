const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const {
  getNotification,
  deleteNotificationById,
  clearAllNotifications,
} = require("../controllers/notification");

router.get("/getNotification", verifyToken, getNotification);
router.delete(
  "/deleteNotification/:notificationId",
  verifyToken,
  deleteNotificationById
);
router.delete("/allNotifications", verifyToken,clearAllNotifications);

module.exports = router;
