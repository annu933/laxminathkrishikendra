// middleware/auth.js
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  console.log("req",req)
  // const token = req.headers.authorization?.split(" ")[1];
  const token = req.cookies.token;
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, process.env.EXPRESS_SESSION_SECRET, (err, decoded) => {
    if (err) {
       console.log("JWT ERROR:", err.message);
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

exports.requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role)
      return res.status(403).json({ message: "Forbidden: Insufficient rights" });
    next();
  };
};
