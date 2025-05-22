import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.SECRET_JWT;
const ADMIN_ID = process.env.ADMIN_ID;

function requireAdmin(req, res, next) {
  const token = req.headers["x-access-token"];
  console.log("Received token:", token); // 👈 Debug line

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded); // 👈 Debug line

    if (!decoded.userID || decoded.userID !== ADMIN_ID) {
      console.log("Admin check failed"); // 👈 Debug line
      return res.status(403).json({ error: "Access denied: Admins only" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification error:", err); // 👈 Debug line
    return res.status(401).json({ error: "Failed to authenticate token" });
  }
}

export { requireAdmin };
