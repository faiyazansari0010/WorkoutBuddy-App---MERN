const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("authHeader - " ,authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token required!" });
  }

  const token = authHeader.split(" ")[1];
  console.log("token - " ,token)
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.error("JWT verify error:", error.message);
    res.status(401).json({ error: "Request not authorized!" });
  }
};

module.exports = authenticateUser;
