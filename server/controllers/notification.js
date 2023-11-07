const { promisePool } = require("../config/dbConfig");

//fetch notifications
const getNotification = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [results] = await promisePool.execute(
      "SELECT " +
        "N.*, " +
        "U.user_pic_url AS notify_from_profile_pic, " +
        "U.username AS notify_from_username, " +
        "C.channel_pic_url AS channel_pic, " +
        "V.thumbnail_url AS video_thumbnail " +
        "FROM Notifications AS N " +
        "LEFT JOIN Users AS U ON N.notify_from = U.id " +
        "LEFT JOIN Channel AS C ON N.channel_id = C.id " +
        "LEFT JOIN Videos AS V ON N.video_id = V.id " +
        "WHERE N.notify_to = ? " +
        "ORDER BY N.created_at DESC",
      [userId]
    );

    return res.status(200).json({ success: true, results });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//delete notificationById
const deleteNotificationById = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user.userId;

    const [notificationResult] = await promisePool.execute(
      "SELECT * From Notifications Where notify_to = ?",
      [userId]
    );

    if (notificationResult.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No notifications exists for the user",
      });
    }

    await promisePool.execute("DELETE From Notifications Where id = ?", [
      notificationId,
    ]);

    return res
      .status(200)
      .json({ success: true, message: "Notification deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//clear all notifications
const clearAllNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [result] = await promisePool.execute(
      "DELETE From Notifications Where notify_to = ?",
      [userId]
    );
    if (result.affectedRows > 0) {
      return res
        .status(200)
        .json({
          success: true,
          message: "All notifications related to the user removed",
        });
    } else {
      return res
        .status(404)
        .json({
          success: false,
          message: "No notifications found for this user.",
        });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getNotification,
  deleteNotificationById,
  clearAllNotifications,
};
