const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisePool } = require("../config/dbConfig.js");

//Register a new user
const registerUser = async (req, res) => {
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
      return res.status(400).json({ message: "Email already registered." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await promisePool.execute(
      "INSERT INTO Users(username, email, password) VALUES(?,?,?)",
      [username, email, hashedPassword]
    );
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);

    //check for existing users
    const [userRows, userFields] = await promisePool.execute(
      "SELECT * from Users WHERE email=?",
      [email]
    );
    const user = userRows[0];

    if (!userRows|| userRows.length === 0) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    console.log(user.password);

    if (!passwordMatched) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};

module.exports = { registerUser, loginUser };
