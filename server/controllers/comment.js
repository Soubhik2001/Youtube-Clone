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
    return res.status(200).json({success:true, message:"Comment added successfully.", commentId:commentResult.insertId});
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false, message:"Internal Server Error."});
  }
};

// //Get Comments by video id
// const getCommentByVideoId = async(req, res)=>{
//     try {
        
//     } catch (error) {
        
//     }
// };


module.exports ={addComment};