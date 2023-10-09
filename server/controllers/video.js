const path = require("path");
const fs = require("fs");
const { promisePool } = require("../config/dbConfig.js");


//Get Videos
const getVideos = async (req, res) => {
  try {
    const [results] = await promisePool.execute("SELECT * FROM Videos");

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

//upload video
const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No video file provided!" });
    }
    const { channel_id } = req.body;
    const videoUrl = req.file.path;
    const userId = req.user.userId;

    const [userResult] = await promisePool.execute(
      "SELECT email From Users Where id=?",
      [userId]
    );

    if (userResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not authenticated" });
    }

    const [videoResult] = await promisePool.execute(
      "INSERT INTO Videos (video_url, uploader_id, channel_id) VALUES (?, ?,?)",
      [videoUrl, userId, channel_id]
    );

    return res.status(200).json({success:true, message:"Video uploaded successfully", videoUrl, videoId:videoResult.insertId});
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false, message:"Internal server error"});
  }
};


module.exports = { uploadVideo, getVideos };






// //Upload video
// const uploadVideo = async (req, res) => {
//   try {
//     const { email, channel_id } = req.body;

//     if (!req.file) {
//       return res.send(400).json({ message: "No video file provided!" });
//     }

//     const videoUrl = req.file.path;

//     // Check if the user with the specified email exists
//     const [userResult] = await promisePool.execute(
//       "SELECT id FROM Users WHERE email = ?",
//       [email]
//     );

//     if (userResult.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found!" });
//     }

//     const userId = userResult[0].id;

//     const [videoResult] = await promisePool.execute(
//       "INSERT INTO Videos (video_url, uploader_id, channel_id) VALUES (?, ?,?)",
//       [videoUrl, userId, channel_id]
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Video Uploaded successfully",
//       videoUrl,
//       videoId: videoResult.insertId,
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error." });
//   }
// };


// //Delete video
// const deleteVideo = async (req, res) => {
//   try {
//     const { videoId } = req.params;
//     const { userId } = req.user;

//     //Check for existence of video
//     const [videoResult] = await promisePool.execute(
//       "SELECT * FROM Videos Where id = ? ",[videoId]
//     );

//     if (videoResult.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Video not found!"});
//     }

//     const video = videoResult[0];

//     // Check if the video was uploaded by the user
//     if(video.uploader_id !==userId){
//       return res.status(403).json({success:false, message:"Not authorized."});
//     }

//     await promisePool.execute('DELETE From Videos Where id=?',[videoId]);

//     const videoFilePath = path.join(__dirname, "..", "uploads","videos",video.videoUrl);

//     fs.unlinkSync(videoFilePath);

//     return res.status(200).json({success:true,message:"Video deleted successfully."});
//   } catch (error) {
//     console.log(error);
//     return res.send(500).json({success:false, message:"Internal server error."});
//   }
// };