const { promisePool } = require("../config/dbConfig");

const getVideosFromSubscribedChannels = async (req, res) => {
  try {
  } catch (error) {}
};

const getLikedVideos = async (req, res) => {
  try {
    const userId = req.user.userId;
    const [likedVideos] = await promisePool.execute(
      " SELECT * From Videos JOIN Likes ON Videos.id = Likes.video_id Where Likes.user_id = ? AND is_like = 1",
      [userId]
    );

    if(likedVideos.length === 0){
        return res.status(404).json({success:false, message:"No Videos liked"});
    }

    return res.status(200).json({success:true, likedVideos});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getSubscriptions = async (req, res) => {
  try {
  } catch (error) {}
};

const getAllChannels = async (req, res) => {
  try {
  } catch (error) {}
};

//Get Videos
const getAllVideos = async (req, res) => {
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

module.exports = {
  getVideosFromSubscribedChannels,
  getLikedVideos,
  getSubscriptions,
  getAllChannels,
  getAllVideos,
};
