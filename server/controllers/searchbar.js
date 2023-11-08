const { promisePool } = require("../config/dbConfig");

//search for Videos
const searchVideos = async (req, res) => {
  try {
    const { searchItem } = req.query;
    const [results] = await promisePool.execute(
      "SELECT V.*, C.channel_pic_url, C.channel_name, " +
      "(SELECT COUNT(*) FROM Likes L WHERE L.video_id = V.id) AS likes_count "+
      "FROM Videos V "+
      "LEFT JOIN Channel C ON V.channel_id = C.id " +
      "WHERE V.title LIKE ?",
      [`%${searchItem}%`]
    );
    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Search not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Search Found", results });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//search for Channels
const searchChannels = async (req, res) => {
  try {
    const { searchItem } = req.query;
    const [results] = await promisePool.execute(
      "SELECT C.*, "+
      "(SELECT COUNT(*) FROM Subscription S WHERE S.channel_id = C.id) AS subscribers_count "+
      "FROM Channel C "+
      "WHERE C.channel_name LIKE ?",
      [`%${searchItem}%`]
    );

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Search not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Search Found", results });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { searchVideos, searchChannels };
