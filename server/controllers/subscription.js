const { promisePool } = require("../config/dbConfig");

//Subscribe a channel
const addSubscription = async (req, res) => {
  try {
    const { channelId } = req.params;
    const userId = req.user.userId;

    const [existingSubscription] = await promisePool.execute(
      "SELECT * From Subscription Where subscriber_id = ? AND channel_id = ?",
      [userId, channelId]
    );

    if (existingSubscription.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "User already subscribed" });
    }

    await promisePool.execute(
      "INSERT INTO Subscription (subscriber_id, channel_id) VALUES (?,?)",
      [userId, channelId]
    );
    return res
      .status(200)
      .json({ success: true, message: "Channel subscribed successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const { channelId } = req.params;
    const userId = req.user.userId;

    const [existingSubscription] = await promisePool.execute(
      "SELECT * From Subscription Where subscriber_id = ? AND channel_id = ?",
      [userId, channelId]
    );

    if (existingSubscription.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }

    await promisePool.execute(
      "DELETE From Subscription Where subscriber_id = ? AND channel_id = ?",
      [userId, channelId]
    );
    return res
      .status(200)
      .json({ success: true, message: "Unsubscribed successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: true, message: "Internal Server Error" });
  }
};

const getSubscribersByChannel = async (req, res) => {
  try {
    const { channelId } = req.params;

    const [channelResults] = await promisePool.execute(
      "SELECT * From Channel Where id = ?",
      [channelId]
    );

    if (channelResults.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Channel not found" });
    }

    const [subscriptions] = await promisePool.execute(
      "SELECT s.*, u.username AS subscriber_username FROM Subscription s INNER JOIN Users u ON s.subscriber_id = u.id WHERE s.channel_id = ?",
      [channelId]
    );

    if (subscriptions.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No subscribers found" });
    }

    return res.status(200).json({ success: true, subscriptions });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getSubscribersByUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [subscriptions] = await promisePool.execute(
      "SELECT s.*, c.channel_name FROM Subscription s INNER JOIN Channel c ON s.channel_id = c.id WHERE s.subscriber_id = ? ",
      [userId]
    );

    if (subscriptions.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No channel subscribed" });
    }

    return res.status(200).json({ success: true, subscriptions });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  addSubscription,
  deleteSubscription,
  getSubscribersByChannel,
  getSubscribersByUser,
};
