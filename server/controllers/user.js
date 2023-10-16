const { promisePool } = require("../config/dbConfig");

const getVideosFromSubscribedChannels = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [results] = await promisePool.execute(
      "SELECT " +
        "Channel.id AS channel_id, " +
        "Channel.channel_name, " +
        "Channel.channel_pic_url, " +
        "Videos.thumbnail_url, " +
        "Videos.title, " +
        "COUNT(Likes.id) AS like_count " +
        "FROM Channel " +
        "JOIN Subscription ON Channel.id = Subscription.channel_id " +
        "JOIN Videos ON Channel.id = Videos.channel_id " +
        "LEFT JOIN Likes ON Videos.id = Likes.video_id " +
        "WHERE Subscription.subscriber_id = ? " +
        "GROUP BY Videos.id",
      [userId]
    );

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No video found from Subscribed Channels",
      });
    }

    return res.status(200).json({ success: true, results });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getLikedVideos = async (req, res) => {
  try {
    const userId = req.user.userId;
    const [likedVideos] = await promisePool.execute(
      "SELECT V.*, L.is_like, "+
      "(SELECT COUNT(*) FROM Likes WHERE video_id = V.id AND is_like = 1) AS like_count "+
      "FROM Videos V "+
      "JOIN Likes L ON V.id = L.video_id "+
      "WHERE L.user_id = ? AND L.is_like = 1",
      [userId]
    );

    if (likedVideos.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Videos liked" });
    }

    return res.status(200).json({ success: true, likedVideos });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getSubscriptions = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [subscribedChannels] = await promisePool.execute(
      "SELECT Channel.channel_name, Channel.channel_pic_url, COUNT(Subscription.id) AS subscriber_count " +
        "FROM Channel " +
        "JOIN Subscription ON Channel.id = Subscription.channel_id " +
        "WHERE Subscription.subscriber_id = ? " +
        "GROUP BY Channel.id",
      [userId]
    );

    if (subscribedChannels.length === 0) {
      return res
        .status(404)
        .json({ success: false, messgae: "No channels subscribed yet" });
    }

    return res.status(200).json({ success: true, subscribedChannels });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getAllChannels = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [channelResults] = await promisePool.execute(
      "SELECT Channel.channel_name, Channel.channel_pic_url, COUNT(Subscription.id) AS subscriber_count " +
        "FROM Channel " +
        "JOIN Subscription ON Channel.id = Subscription.channel_id " +
        "GROUP BY Channel.id"
    );

    if (channelResults === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No channels found!" });
    }
    return res.status(200).json({ success: true, channelResults });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};

//Get Videos
const getAllVideos = async (req, res) => {
  try {
    const [results] = await promisePool.execute("SELECT v.*, c.channel_name, c.channel_pic_url, " + 
    "(SELECT COUNT(*) FROM Likes l WHERE l.video_id = v.id AND l.is_like = 1) AS like_count " + 
    "FROM Videos v " + 
    "JOIN Channel c ON v.channel_id = c.id");

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: true, message: "No videos found." });
    }

    return res.status(200).json({ success: true, videos: results });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

//get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const [results] = await promisePool.execute(
      "SELECT * FROM Users Where id = ?",
      [userId]
    );

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, results });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//update user profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { username, email, password } = req.body;

    const [results] = await promisePool.execute(
      "SELECT * FROM Users Where id = ?",
      [userId]
    );

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const [updateResult] = await promisePool.execute(
      "UPDATE Users Set username = ?, email = ?, password =? Where id = ?",
      [username, email, password, userId]
    );

    if (updateResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Update unsuccessful" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Updated successfully" });

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getVideosFromSubscribedChannels,
  getLikedVideos,
  getSubscriptions,
  getAllChannels,
  getAllVideos,
  getUserProfile,
  updateUserProfile,
};
