const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisePool } = require("../config/dbConfig.js");
const {
  validateEmail,
  validatePassword,
  validateUsername,
  isValid,
} = require("../validations/validations.js");
const { verifyToken } = require("../middleware/verifyToken.js");

//Register a new user
const registerUser = [
  validateEmail,
  validatePassword,
  validateUsername,
  isValid,
  async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log(req.body);
      //Check for existing users
      const [results] = await promisePool.execute(
        "SELECT * FROM Users WHERE email =?",
        [email]
      );
      // console.log(fields);
      if (results.length) {
        return res
          .status(400)
          .json({ success: false, message: "Email already registered." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await promisePool.execute(
        "INSERT INTO Users(username, email, password) VALUES(?,?,?)",
        [username, email, hashedPassword]
      );
      res
        .status(200)
        .json({ success: true, message: "User registered successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ succcess: false, error: "Internal server error" });
    }
  },
];

//Login a user
const loginUser = [
  validateEmail,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      // console.log(req.body);

      //check for existing users
      const [userRows, userFields] = await promisePool.execute(
        "SELECT * from Users WHERE email=?",
        [email]
      );
      const user = userRows[0];

      if (!userRows || userRows.length === 0) {
        return res
          .status(401)
          .json({ succes: false, message: "Authentication failed" });
      }

      const passwordMatched = await bcrypt.compare(password, user.password);
      // console.log(user.password);

      if (!passwordMatched) {
        return res
          .status(401)
          .json({ success: false, message: "Authentication failed" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "2d",
      });
      res
        .status(200)
        .json({ success: true, token, message: "Login successful" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal Server Error" });
      console.log(error);
    }
  },
];

//Reset Password
const resetPassword = [
  validateEmail,
  async (req, res) => {
    try {
      //const { token } = req.query;
      const token = req.headers["authorization"]?.split("Bearer ")[1];
      const { email, oldPassword, newPassword } = req.body;

      //check for existence of user
      const [userRows] = await promisePool.execute(
        "SELECT * from Users WHERE email=?",
        [email]
      );
      if (!userRows) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const user = userRows[0];

      const passwordMatched = await bcrypt.compare(oldPassword, user.password);

      if (!passwordMatched) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

       // Verify the token
       jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedUser) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, message: "Invalid token" });
        }

        if (decodedUser.userId !== user.id) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized access" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await promisePool.execute(
          "UPDATE Users SET password = ? WHERE email = ?",
          [hashedPassword, email]
        );

        res
          .status(200)
          .json({ success: true, message: "Password reset successful" });
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal Server Error" });
      console.log(error);
    }
  },
];


module.exports = { registerUser, loginUser, resetPassword };

// //Reset Password
// const resetPassword = [
//   validateEmail,
//   async (req, res) => {
//     try {
//       const { email, oldPassword, newPassword } = req.body;

//       //check for existence of user
//       const [userRows] = await promisePool.execute(
//         "SELECT * from Users WHERE email=?",
//         [email]
//       );
//       if (!userRows) {
//         return res.status(404).json({ success:false, message: "User not found" });
//       }

//       const user = userRows[0];

//       // //extract JWT token
//       // const token = req.headers.authorization;
//       // if(!token){
//       //   return res.send(401).json({success:false, message:"Unauthorized access"});
//       // }

//       // //verify the token
//       // jwt.verify(token, process.env.JWT_SECRET_KEY,async(err,decoded)=>{
//       //   if(err){
//       //     return res.send(401).josn({success:false, message:"Invalid token"});
//       //   }

//       //   if(decoded.userId !== user.id){
//       //     return res.send(401).json({success:false, message:"Unauthorized access"});
//       //   }

//         const passwordMatched = await bcrypt.compare(oldPassword, user.password);

//       if (!passwordMatched) {
//         return res.status(401).json({ success:false, message: "Invalid credentials" });
//       }

//       const hashedPassword = await bcrypt.hash(newPassword, 10);

//       await promisePool.execute("UPDATE Users SET password =? WHERE email=?", [
//         hashedPassword,
//         email,
//       ]);

//       res.status(200).json({ success:true, message: "Password reset successful" });

//     } catch (error) {
//       res.status(500).json({ success:false, error: "Internal Server Error" });
//       console.log(error);
//     }
//   },
// ];
