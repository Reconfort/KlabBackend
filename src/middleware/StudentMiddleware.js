import Users from "../models/authModels";
import jwt from "jsonwebtoken";

async function StudentMiddleware(req, res, next) {
  let token;
  token = req.headers.parentauth;
  try {
    if (!token) {
      return res.status(401).json({
        status: "Failed",
        message: "You need login in first",
      });
    } else {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      const loggedUser = await Users.findOne({ _id: decoded.id });
      if (!loggedUser) {
        return res.status(404).json({
          status: "Failed",
          message: "Invalid",
        });
      }
      if (loggedUser.role === "parent") {
        req.loggedParent = loggedUser;
        next();
      } else {
        return res.status(403).json({
          status: "Failed",
          message: "Only parent can create a student",
        });
      }
    }
  } catch (error) {
    return res.status(403).json({
      status: "error",
      error: error.message,
    });
  }
}

export default StudentMiddleware;
