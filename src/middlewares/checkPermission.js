import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";
dotenv.config();

const { SECRET_CODE } = process.env;

export const checkisAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({
        message: "You are not logged in!",
      });
    }
    const decoded = jwt.verify(token, SECRET_CODE);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(403).json({
        message: "Token error!",
      });
    }

    if (user.role !== "admin") {
      return res.status(400).json({
        message: "You have no right to do this!",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};

export const checkAdminLastest = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(400).json({
        message: "You have no right to do this!",
      });
    }

    const userAdminCount = await User.countDocuments({ role: "admin" });
    console.log("userAdminCount", userAdminCount);
    if (userAdminCount === 1) {
      return res.status(400).json({
        message: "You cannot delete the last admin account!",
      });
    }
    next();
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
