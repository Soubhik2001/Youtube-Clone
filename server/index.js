require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {upload} = require("./config/multer.js");
// const {dbConnect} = require('./config/dbConfig');

const app = express();
const server = require("http").createServer(app);

//Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads',express.static("uploads"));

//Routes
const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/video');
const commentRoutes = require('./routes/comment');
const channelRoutes = require('./routes/channel');
const likeRoutes = require('./routes/like');
const subscriptionRoutes = require('./routes/subscription');
const userRoutes = require('./routes/user');

app.use("/auth", authRoutes);
app.use("/video", upload.single("video"),videoRoutes);
app.use("/comment",commentRoutes);
app.use("/channel",channelRoutes);
app.use("/like",likeRoutes);
app.use("/subscription", subscriptionRoutes);
app.use("/user",userRoutes);

//Server
const startServer = async () => {
  try {
    // await dbConnect();
    server.listen(3000, () => {
      console.log("Server is running on port : ", 3000);
    });
  } catch (error) {
    console.log("Error in starting the server .");
    console.log(error);
  }
};

startServer();

