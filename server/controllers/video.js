const path = require("path");
const fs = require("fs");
const { promisePool } = require("../config/dbConfig.js");

//upload video url
const uploadVideo = async (req, res) => {
  try {
    const { channel_id, title, description, thumbnail_url, video_url } =
      req.body;
    const userId = req.user.userId;

    // to check whether the user is registered
    const [userResult] = await promisePool.execute(
      "SELECT email FROM Users WHERE id = ?",
      [userId]
    );
    if (userResult.length === 0) {
      return res
        .status(403)
        .json({ success: false, message: "User not registered" });
    }

    //to check whether the uploader is the owner of the channel
    const [channelResult] = await promisePool.execute(
      "SELECT * From Channel Where id = ? AND owner_id = ?",
      [channel_id, userId]
    );
    if (channelResult.length === 0) {
      return res
        .status(403)
        .json({
          success: false,
          message: "User is not the owner of the channel",
        });
    }

    const [videoResult] = await promisePool.execute(
      "INSERT INTO Videos (title, description, thumbnail_url, video_url, uploader_id, channel_id) VALUES (?,?,?,?,?,?)",
      [title, description, thumbnail_url, video_url, userId, channel_id]
    );
    return res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      videoUrl: video_url,
    });

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Sever Error" });
  }
};

// to delete video
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


// //to upload video
// const uploadVideo = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res
//         .status(400)
//         .json({ success: false, message: "No video file provided!" });
//     }

//     const { channel_id, title, description, thumbnail_url } = req.body;
//     const videoFilename = req.file.filename;
//     const userId = req.user.userId;

//     //to check whether the user is registered
//     const [userResult] = await promisePool.execute(
//       "SELECT email FROM Users WHERE id = ?",
//       [userId]
//     );
//     if (userResult.length === 0) {
//       return res
//         .status(403)
//         .json({ success: false, message: "User not registered" });
//     }

//     //to check whether the uploader is the owner of the channel
//     const [channelResult] = await promisePool.execute(
//       "SELECT * From Channel Where id = ? AND owner_id = ?",
//       [channel_id, userId]
//     );
//     if(channelResult.length === 0){
//       return res.status(403).json({success:false, message:"User is not the owner of the channel"});
//     }

//     const fullVideoURL = `http://localhost:3000/uploads/${videoFilename}`;
//     const [videoResult] = await promisePool.execute(
//       "INSERT INTO Videos (title, description, thumbnail_url, video_url, uploader_id, channel_id) VALUES (?,?,?,?,?,?)",
//       [title, description, thumbnail_url, fullVideoURL, userId, channel_id]
//     );
//     return res.status(200).json({
//       success: true,
//       message: "Video uploaded successfully",
//       videoUrl: fullVideoURL,
//       videoId: videoResult.insertId,
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// };