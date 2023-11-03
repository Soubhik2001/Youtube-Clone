const { promisePool } = require("../config/dbConfig");

//Add like to a video
const addLike = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.userId;

    const [videoResult] = await promisePool.execute(
      "SELECT * FROM Videos WHERE id = ?",
      [videoId]
    );

    if (videoResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    const channelId = videoResult[0].channel_id;
    const [channelResult] = await promisePool.execute(
      "SELECT owner_id from Channel where id = ?",
      [channelId]
    );

    if (channelResult.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Channel not found" });
    }

    const owner_id = channelResult[0].owner_id;

    const [existingLike] = await promisePool.execute(
      "SELECT * FROM Likes WHERE user_id = ? AND video_id = ? AND is_like = 1",
      [userId, videoId]
    );

    if (existingLike.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Already liked the video" });
    }

    // Delete any existing dislike by the user for the same video
    await promisePool.execute(
      "DELETE FROM Likes WHERE user_id = ? AND video_id = ? AND is_like = -1",
      [userId, videoId]
    );

    //Insert the like in the Likes table
    await promisePool.execute(
      "INSERT INTO Likes (user_id, video_id, is_like) VALUES (?, ?, 1)",
      [userId, videoId]
    );

    //Insert the like into the Notifications table
    await promisePool.execute(
      "INSERT into Notifications (notify_from, notify_to, type, channel_id, video_id) VALUES(?,?,?,?,?)",
      [userId, owner_id, "like", channelId, videoId]
    );

    return res.status(200).json({ success: true, message: "Liked the video" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//add dislike to a video
const addDislike = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.userId;

    const [videoResult] = await promisePool.execute(
      "SELECT * From Videos Where id = ?",
      [videoId]
    );

    if (videoResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    const channelId = videoResult[0].channel_id;
    const [channelResult] = await promisePool.execute(
      "SELECT owner_id from Channel where id = ?",
      [channelId]
    );

    const owner_id = channelResult[0].owner_id;

    if (channelResult.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Chanel not found" });
    }

    const [existingDislike] = await promisePool.execute(
      "SELECT * From Likes Where user_id = ? AND video_id = ? AND is_like = -1",
      [userId, videoId]
    );

    if (existingDislike.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Video already disliked" });
    }

    // Delete any existing like by the user for the same video
    await promisePool.execute(
      "DELETE FROM Likes WHERE user_id = ? AND video_id = ? AND is_like = 1",
      [userId, videoId]
    );

    //Insert the dislike into the likes table
    await promisePool.execute(
      "INSERT INTO Likes (user_id, video_id, is_like) VALUES (?,?,-1)",
      [userId, videoId]
    );

    //Insert the dislike into the notifications table
    await promisePool.execute(
      "INSERT INTO Notifications (notify_from, notify_to, type, channel_id, video_id) VALUES(?,?,?,?,?)",
      [userId, owner_id, "dislike", channelId, videoId]
    );

    return res
      .status(200)
      .json({ success: true, message: "Disliked the video" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//delete a like from video
const deleteLike = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.userId;

    const [videoResult] = await promisePool.execute(
      "SELECT * From Videos Where id = ?",
      [videoId]
    );

    if (videoResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    const [existingLike] = await promisePool.execute(
      "SELECT * From Likes Where user_id = ? AND video_id = ? AND is_like = 1",
      [userId, videoId]
    );

    if (existingLike.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Like not found" });
    }

    await promisePool.execute(
      "DELETE From Likes Where user_id = ? AND video_id = ? AND is_like = 1",
      [userId, videoId]
    );

    return res.status(200).json({ success: true, message: "Deleted the like" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//delete a dislike from a video
const deleteDislike = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.userId;

    const [videoResult] = await promisePool.execute(
      "SELECT * From Videos Where id = ?",
      [videoId]
    );

    if (videoResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    const [existingLike] = await promisePool.execute(
      "SELECT * From Likes Where user_id = ? AND video_id = ? AND is_like = -1",
      [userId, videoId]
    );

    if (existingLike.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Dislike not found" });
    }

    await promisePool.execute(
      "DELETE From Likes Where user_id = ? AND video_id = ? AND is_like = -1",
      [userId, videoId]
    );

    return res
      .status(200)
      .json({ success: true, message: "Deleted the dislike" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getLikesByVideoId = async (req, res) => {
  try {
    const { videoId } = req.params;

    const [videoResult] = await promisePool.execute(
      "SELECT * From Videos Where id = ?",
      [videoId]
    );

    if (videoResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    const [likes] = await promisePool.execute(
      "SELECT * From Likes Where video_id = ? AND is_like = 1",
      [videoId]
    );

    if (likes.length === 0) {
      return res.status(404).json({ success: false, message: "No Likes Yet" });
    }

    return res.status(200).json({ success: true, likes });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getDislikesByVideoId = async (req, res) => {
  try {
    const { videoId } = req.params;

    const [videoResult] = await promisePool.execute(
      "SELECT * From Videos Where id = ?",
      [videoId]
    );

    if (videoResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    const [dislikes] = await promisePool.execute(
      "SELECT * From Likes Where video_id = ? AND is_like = -1",
      [videoId]
    );

    if (dislikes.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Dislikes Yet" });
    }

    return res.status(200).json({ success: true, dislikes });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  addLike,
  addDislike,
  deleteLike,
  deleteDislike,
  getLikesByVideoId,
  getDislikesByVideoId,
};
