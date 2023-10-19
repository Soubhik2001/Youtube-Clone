const { promisePool } = require("../config/dbConfig.js");

//add comments to a video
const addComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;
    const userId = req.user.userId;

    const [videoResult] = await promisePool.execute(
      "SELECT * From Videos Where id = ?",
      [videoId]
    );

    if (videoResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found!" });
    }

    const [commentResult] = await promisePool.execute(
      "INSERT INTO Comments (video_id, user_id, content) VALUES (?, ?, ?)",
      [videoId, userId, text]
    );
    return res.status(200).json({
      success: true,
      message: "Comment added successfully.",
      commentId: commentResult.insertId,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};

//Get Comments by video id
const getCommentByVideoId = async (req, res) => {
  try {
    const { videoId } = req.params;

    const [video] = await promisePool.execute(
      "SELECT * From Videos Where id=?",
      [videoId]
    );

    if (video.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    const [comments] = await promisePool.execute(
      "SELECT C.*, U.username, U.user_pic_url " +
      "FROM Comments AS C " +
      "JOIN Users AS U ON C.user_id = U.id " + 
      "WHERE C.video_id = ?",
      [videoId]
    );

    if (comments.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Comments not found" });
    }

    return res.status(200).json({ success: true, comments: comments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};

//delete comments from a video
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const [commentResult] = await promisePool.execute(
      "SELECT * From Comments Where id = ? ",
      [commentId]
    );

    if (commentResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    const userId = req.user.userId;

    if (commentResult[0].user_id !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    await promisePool.execute(
      "DELETE From Comments Where id = ? And user_id = ?",
      [commentId, userId]
    );

    return res
      .status(200)
      .json({ success: true, message: "Deleted the comment successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: true, message: "Internal Server Error" });
  }
};

//update Comment
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user.userId;

    const [existingComment] = await promisePool.execute(
      "SELECT * From Comments Where id = ?",
      [commentId]
    );

    if (existingComment.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Comment does not exist" });
    }

    if (existingComment[0].user_id !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    const updateResult = await promisePool.execute(
      "UPDATE Comments SET content = ? Where id = ?",
      [text, commentId]
    );

    if (updateResult[0].affectedRows === 0) {
      return res
        .status(500)
        .json({ success: false, message: "Comment update failed" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Comment updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  addComment,
  getCommentByVideoId,
  deleteComment,
  updateComment,
};
