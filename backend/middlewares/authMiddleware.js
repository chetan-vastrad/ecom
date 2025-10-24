// This middleware ensures that only logged-in users can access certain routes.
import jwt from "jsonwebtoken";
import {User} from "../model/User.js";

const protect = async (req,res,next) =>{
    let token;
    if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ){
    try {
        // This extracts the actual token from the header. It splits the string by space and takes the second part, which is the token.
        token = req.headers.authorization.split(" ")[1];
        // jwt.verify() decodes and validates the token using a secret key (JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Using the id from the decoded token payload, it fetches the user from the database.
        req.user = await User.findById(decoded.id).select("-password");
        // If everything is good, it calls next() to move to the next middleware or route.
        next();
    } catch (error) {
     return res.status(401).json({ message: "Not authorized, invalid token" });   
    }
  }
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });
}

// Role-based Access Control
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied: ${req.user?.role || "unknown"} is not authorized to perform this action`,
      });
    }
    next();
  };
};

export {protect,authorizeRoles}