const { promisePool } = require("../config/dbConfig");

//fetch notifications
const getNotification = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [results] = await promisePool.execute(
      "SELECT * from Notifications Where notify_to = ? ORDER BY created_at DESC",
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

    if(notificationResult.length === 0){
        return res.status(400).json({success:false, message:'No notifications exists for the user'});
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

module.exports = { getNotification, deleteNotificationById };
