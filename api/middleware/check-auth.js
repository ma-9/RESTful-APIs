const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../../config/config");

module.exports = (req, res, next) => {
  try {
    const jwtToken = req.headers.authorization;
    const token = jwtToken.substr(7);
    const decoded = jwt.verify(token, JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth Failed"
    });
  }
};
