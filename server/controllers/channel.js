const { promisePool } = require("../config/dbConfig");

//Add channels
const addChannel = async (req, res) => {
  try {
    const { channelName } = req.body;
    const userId = req.user.userId;

    const [channelResult] = await promisePool.execute(
      'INSERT INTO Channel (channel_name, owner_id) VALUES (?,?)',
      [channelName, userId]
    );
    return res.status(200).json({success:true, message:"Channel created successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false, message:"Internal server error."});
  }
};


//Get channels
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

const deleteChannel = async (req, res) =>{
  try {
    const {channelId} = req.params;

    const [channelResult] = await promisePool.execute("SELECT * From Channel Where id = ?", [channelId]);

    if(channelResult.length === 0){
      return res.status(404).json({success:false, message:"Channel not found"});
    }

    await promisePool.execute("DELETE From Channel Where id = ?", [channelId]);

    return res.status(200).json({success:true, message:"Channel deleted successfully."});
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false, message:"Internal Server Error"});
  }
};

module.exports = { addChannel, getChannels, deleteChannel };
