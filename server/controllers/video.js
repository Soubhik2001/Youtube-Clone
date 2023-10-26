const path = require("path");
const fs = require("fs");
const { promisePool } = require("../config/dbConfig.js");

const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No video file provided!" });
    }

    const { channel_id, title, description, thumbnail_url, duration } =
      req.body;
    const videoFilename = req.file.filename;
    const userId = req.user.userId;

    const [userResult] = await promisePool.execute(
      "SELECT email FROM Users WHERE id = ?",
      [userId]
    );

    if (userResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not authenticated" });
    }

    const fullVideoURL = `http://localhost:3000/uploads/${videoFilename}`;

    const [videoResult] = await promisePool.execute(
      "INSERT INTO Videos (title, description, thumbnail_url, duration, video_url, uploader_id, channel_id) VALUES (?, ?,?,?,?,?,?)",
      [
        title,
        description,
        thumbnail_url,
        duration,
        fullVideoURL,
        userId,
        channel_id,
      ]
    );

    return res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      videoUrl: fullVideoURL,
      videoId: videoResult.insertId,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// //Delete video
const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.userId;

    const [videoResult] = await promisePool.execute(
      "SELECT * FROM Videos Where id = ? ",
      [videoId]
    );
    // console.log(videoResult);

    if (videoResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found!" });
    }

    const video = videoResult[0];

    if (video.uploader_id !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized." });
    }

    await promisePool.execute("DELETE From Videos Where id=?", [videoId]);

    fs.unlinkSync(video.video_url);

    return res
      .status(200)
      .json({ success: true, message: "Video deleted successfully." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

module.exports = { uploadVideo, deleteVideo };
