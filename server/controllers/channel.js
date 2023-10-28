const { promisePool } = require("../config/dbConfig");

//Add channels
const addChannel = async (req, res) => {
  try {
    const { channelName, description, channel_pic_url } = req.body;
    const userId = req.user.userId;

    const [channelResult] = await promisePool.execute(
      "INSERT INTO Channel (channel_name, owner_id, description, channel_pic_url) VALUES (?,?,?,?)",
      [channelName, userId, description, channel_pic_url]
    );
    return res
      .status(200)
      .json({ success: true, message: "Channel created successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

//Get all channels
const getChannels = async (req, res) => {
  try {
    const [results] = await promisePool.execute("SELECT * FROM Channel");

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: true, message: "No videos found." });
    }

    return res.status(200).json({ success: true, channels: results });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

//Delete Channel
const deleteChannel = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { channelId } = req.params;

    const [channelResult] = await promisePool.execute(
      "SELECT * From Channel Where id = ?",
      [channelId]
    );

    if (channelResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Channel not found" });
    }

    const channelOwner = channelResult[0].owner_id;

    if(channelOwner !== userId){
      return res.status(403).json({success:false, message: "Not authorized"});
    }

    await promisePool.execute("DELETE From Channel Where id = ?", [channelId]);

    return res
      .status(200)
      .json({ success: true, message: "Channel deleted successfully." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//Update channel
const updateChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const { name, description, channel_pic_url } = req.body;
    const userId = req.user.userId;

    const [existingChannel] = await promisePool.execute(
      "SELECT * From Channel Where id = ?",
      [channelId]
    );

    if (existingChannel.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Channel not found" });
    }
    
    const channelOwner = existingChannel[0].owner_id;

    if(channelOwner !== userId){
      return res.status(403).json({success:false, message:"Not authorized"});
    }

    await promisePool.execute(
      "UPDATE Channel SET channel_name = ?, description = ?, channel_pic_url = ? Where id =?",
      [name, description, channel_pic_url, channelId]
    );

    return res
      .status(200)
      .json({ success: true, message: "Channel updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//get videos and other info from a channel
const getVideoFromChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const userId = req.user.userId;

    const [results] = await promisePool.execute(
      "SELECT " +
        "Channel.id AS channel_id, " +
        "Channel.channel_name, " +
        "Channel.channel_pic_url, " +
        "Channel.description, "+
        "Channel.owner_id, " +
        "Videos.thumbnail_url, " +
        "Videos.title, " +
        "Videos.id, " +
        "COUNT(CASE WHEN Likes.is_like = 1 THEN Likes.id ELSE NULL END) AS like_count, " +
        "(SELECT COUNT(*) FROM Subscription WHERE Subscription.channel_id = Channel.id) AS subscriber_count " +
        "FROM " +
        "Channel " +
        "JOIN " +
        "Videos ON Channel.id = Videos.channel_id " +
        "LEFT JOIN " +
        "Likes ON Videos.id = Likes.video_id " +
        "LEFT JOIN " +
        "Subscription ON Channel.id = Subscription.channel_id " +
        "WHERE " +
        "Channel.id = ? " +
        "GROUP BY " +
        "Videos.id",
      [channelId]
    );

      const isOwner = results[0].owner_id === userId;

    if(results.length === 0){
      return res.status(404).json({success:false, message:"Channel not found"});
    }
    return res.status(200).json({success:true, results, isOwner});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { addChannel, getChannels, deleteChannel, updateChannel, getVideoFromChannel };
