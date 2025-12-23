import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Family } from "../Modules/familyModule.js";

dotenv.config();

// export const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await Family.findById(decoded.id).select("-password");

//       if (!req.user) return res.status(404).json({ message: "User not found" });

//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized, invalid token" });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ message: "Not authorized, no token provided" });
//   }
// };

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Family.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      return next(); // ✅ STOP execution here
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Not authorized, invalid token" });
    }
  }

  // ✅ Only reached if NO token at all
  return res
    .status(401)
    .json({ message: "Not authorized, no token provided" });
};


// ✅ Only Admins (e.g., Patriarch, Admin, etc.)
// export const adminOnly = (req, res, next) => {
//   if (req.user && req.user.familyStatus.toLowerCase() === "admin") {
//     next();
//   } else {
//     res.status(403).json({ message: "Admin access only" });
//   }
// };

export const adminOnly = (req, res, next) => {
  if (
    req.user?.isAdmin ||
    req.user?.familyStatus?.toLowerCase() === "admin"
  ) {
    return next();
  }
  return res.status(403).json({ message: "Admins only" });
};
