const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign({ id: user._id,email: user.email,role: user.role  }, process.env.JWT_KEY,{ expiresIn: "1h" });
  return token;
};

module.exports.generateToken = generateToken;
