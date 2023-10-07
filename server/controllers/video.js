const path = require("path");
const fs = require("fs");
const { promisePool } = require("../config/dbConfig.js");

//Upload video
const uploadVideo = async (req, res) => {
  try {
    const { email, channel_id } = req.body;

    if (!req.file) {
      return res.send(400).json({ message: "No video file provided!" });
    }

    const videoUrl = req.file.path;

    // Check if the user with the specified email exists
    const [userResult] = await promisePool.execute(
      "SELECT id FROM Users WHERE email = ?",
      [email]
    );

    if (userResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const userId = userResult[0].id;

    const [videoResult] = await promisePool.execute(
      "INSERT INTO Videos (video_url, uploader_id, channel_id) VALUES (?, ?,?)",
      [videoUrl, userId, channel_id]
    );

    return res.status(200).json({
      success: true,
      message: "Video Uploaded successfully",
      videoUrl,
      videoId: videoResult.insertId,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};


const getVideos = async(req,res) =>{
  try {
    const [results] = await promisePool.execute('SELECT * FROM Videos');

    if(results.length === 0){
      return res.status(404).json({success:true, message:"No videos found"});
    }

    return res.status(200).json({success:true, videos:results});

  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false, message:"Internal server error"})
  }
};

module.exports = {uploadVideo, getVideos};
