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

    req.user = decoded; // adding req a fiels of user so we can pass it to next handler if exists in my End points. not a mandattory
    next(); // conveying the dat of req to next handler if exist . not a mandatory
  } catch (err) {
    return res.status(401).json({ error: "Failed to authenticate token" });
  }
}
function requireAuthUsers(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // adding req a fiels of user so we can pass it to next handler if exists in my End points. not a mandattory
    next(); // conveying the dat of req to next handler if exist . not a mandatory
  } catch (err) {
    return res.status(401).json({ error: "Failed to authenticate token" });
  }
}

export { requireAdmin, requireAuthUsers };
