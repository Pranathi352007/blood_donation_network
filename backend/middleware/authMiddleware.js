const jwt = require("jsonwebtoken");

// VERIFY JWT TOKEN
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Token missing."
      });
    }

    // Get token from "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    // Verify JWT token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store logged-in user's information
    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Invalid or expired token."
    });
  }
};


// ROLE-BASED AUTHORIZATION
const authorizeRoles = (...allowedRoles) => {

  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized."
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied for this role."
      });
    }

    next();
  };
};


module.exports = {
  protect,
  authorizeRoles
};