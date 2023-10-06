const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, messages: ["Invalid or expired token ."] });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, messages: ["Invalid token ."] });
  }
};

module.exports = { verifyToken };
