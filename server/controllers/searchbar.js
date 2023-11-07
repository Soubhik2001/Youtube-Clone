const { promisePool } = require("../config/dbConfig");

//search for Videos
const searchVideos = async(req, res) => {
    try {
    const { searchItem } = req.body;
    const [results] = await promisePool.execute("SELECT * From Videos Where title Like ?",[searchItem]);
    if(results.length === 0 ){
        return res.status(404).json({success:false, message:"Search not found"});
    }
    return res.status(200).json({success:true, message:"Search Found", results});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:"Internal Server Error"});
    }

};

//search for Channels
const searchChannels = async(req, res) => {
    try {
        const { searchItem } = req.body;
        const [results] = await promisePool.execute("SELECT * From Channel Where channel_name Like ?",[searchItem]);

        if(results.length === 0){
            return res.status(404).json({success:false, message:"Search not found"});
        }
        return res.status(200).json({success:true, message:"Search Found", results});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:"Internal Server Error"});
    }
};

module.exports = {searchVideos, searchChannels};