require("dotenv").config();
const mysql= require("mysql2");


const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "Youtube",
});

const promisePool = pool.promise();
// const dbConnect = function () {
//   connection.connect(function (err) {
//     if (err) {
//       console.error("error connecting: " + err.stack);
//       return;
//     }
//     console.log("Successfully connected to database...");
//   });
// };

// connection.end();

module.exports = { promisePool};
