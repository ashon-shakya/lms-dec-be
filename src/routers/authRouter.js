import express from "express";
import {
  generateAccessToken,
  loginUser,
  registerUser,
  verifyUser,
} from "../controllers/userController.js";
import {
  loginUserValidator,
  registerUserValidator,
} from "../middleware/requestValidator.js";

const router = express.Router();

// define sub routes
// api/v1/auth
router.post("/register", registerUserValidator, registerUser);
router.post("/login", loginUserValidator, loginUser);
router.post("/verify", verifyUser);

// refresh token
router.get("/refresh", generateAccessToken);

export default router;
