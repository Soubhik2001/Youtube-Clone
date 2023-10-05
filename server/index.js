require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const {dbConnect} = require('./config/dbConfig');

const app = express();
const server = require("http").createServer(app);

//Middlewares
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');

app.use("/auth", authRoutes);


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

