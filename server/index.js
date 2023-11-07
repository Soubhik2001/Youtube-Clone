require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { upload } = require("./config/multer.js");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { promisePool } = require("./config/dbConfig.js");
// const {dbConnect} = require('./config/dbConfig');

const app = express();
const server = require("http").createServer(app);
app.use(cors()); //Middleware

//Socket config
const init = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:8080",
    },
  });

  const userSockets = new Map();

  io.on("connection", (socket) => {
    socket.on("auth", (token) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.userId;
        userSockets.set(userId, socket.id);
        console.log(userSockets);

        socket.on("like", async (videoId) => {
          console.log(videoId);
            const [user] = await promisePool.execute(
            "SELECT Channel.owner_id " +
              "FROM Channel " +
              "JOIN Videos ON Channel.id = Videos.channel_id " +
              "WHERE Videos.id = ? ",
            [videoId]
          );
          notifyUser(user[0].owner_id);
        });
        socket.on("dislike", async (videoId) => {
          console.log(videoId);
          const [user] = await promisePool.execute(
            "SELECT Channel.owner_id " +
              "FROM Channel " +
              "JOIN Videos ON Channel.id = Videos.channel_id " +
              "WHERE Videos.id = ? ",
            [videoId]
          );
          notifyUser(user[0].owner_id);
        });
        socket.on("comment", async (videoId) => {
          console.log(videoId);
          const [user] = await promisePool.execute(
            "SELECT Channel.owner_id " +
              "FROM Channel " +
              "JOIN Videos ON Channel.id = Videos.channel_id " +
              "WHERE Videos.id = ? ",
            [videoId]
          );
          notifyUser(user[0].owner_id);
        });
        socket.on("subscribe", async(channelId) => {
          console.log(channelId);
          const [user] = await promisePool.execute(
            "SELECT Channel.owner_id " +
            "FROM Channel " +
            "Where Channel.id =?",
            [channelId]
          );
          notifyUser(user[0].owner_id);
        });
        socket.on("disconnect", () => {
          console.log("diconnected");
          userSockets.delete(userId);
        });
      } catch (error) {
        console.error("Socket auth failed:", error);
        // socket.disconnect(true);
      }
    });
  });
  const notifyUser = (userId) => {
    const socketId = userSockets.get(userId);
    if (socketId) {
      io.to(socketId).emit("newNotifications");
    }
  };
  return io;
};
init(server);

//Middlewares
app.use(express.json());
app.use("/uploads", express.static("uploads/videos"));

//Routes
const authRoutes = require("./routes/auth");
const videoRoutes = require("./routes/video");
const commentRoutes = require("./routes/comment");
const channelRoutes = require("./routes/channel");
const likeRoutes = require("./routes/like");
const subscriptionRoutes = require("./routes/subscription");
const userRoutes = require("./routes/user");
const notificationRoutes = require("./routes/notification");
const searchbarRoutes = require("./routes/searchbar");

app.use("/auth", authRoutes);
app.use("/video", upload.single("video"), videoRoutes);
app.use("/comment", commentRoutes);
app.use("/channel", channelRoutes);
app.use("/like", likeRoutes);
app.use("/subscription", subscriptionRoutes);
app.use("/user", userRoutes);
app.use("/notification", notificationRoutes);
app.use("/searchbar", searchbarRoutes);

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
