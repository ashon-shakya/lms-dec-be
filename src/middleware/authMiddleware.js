import { User } from "../models/userModel.js";
import { verifyToken } from "../helpers/tokenHelpers.js";

export const authMiddleware = async (req, res, next) => {
  try {
    //1. check the token
    const token = req.headers.authorization;

    //2. verify the token
    if (token) {
      const tokenData = verifyToken(token);
      console.log(tokenData);
      //3 find the user fron the email
      const user = await User.findOne({ email: tokenData.email });
      console.log(user);

      if (user) {
        user.password = "";
        req.user = user;
        return next();
      } else {
        return res.status(401).send({
          status: "error",
          message: "Invalid User",
        });
      }
    } else {
      return res.status(401).send({
        status: "error",
        message: "No token",
      });
    }
  } catch (error) {
    console.log(error);
    if (error.message.includes("jwt expired")) {
      return res.status(401).send({
        status: "error",
        message: error.message,
      });
    } else {
      return res.status(401).send({
        status: "error",
        message: "Token verification failed! ",
      });
    }
  }
};

export const IsAdmin = async (req, res, next) => {
  try {
    if (req.user.role == "admin") {
      return next();
    }
    return res.status(403).send({
      status: "error",
      message: "not allowed admin only",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "error in admin",
    });
  }
};
