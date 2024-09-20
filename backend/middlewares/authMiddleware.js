const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config"); // Make sure the secret is imported from config

const authMiddleware = (req, res, next) => {
  // Get token from header
  const authHeader = req.header("Authorization");

  // Check if no token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Split the Bearer part from the token
  const token = authHeader.split(" ")[1];

  try {
    // Verify token using the secret
    const decoded = jwt.verify(token, JWT_SECRET); // Use the correct secret
    req.user = decoded; // Attach the decoded token (user data) to the request object
    next(); // Move to the next middleware/route handler
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;
    