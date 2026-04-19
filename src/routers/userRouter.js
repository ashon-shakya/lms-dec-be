import express from "express";
import { authMiddleware, IsAdmin } from "../middleware/authMiddleware.js";
import {
  addUser,
  getAllUsers,
  getUserDetail,
  updateUserRole,
} from "../controllers/userController.js";

const router = express.Router();

// define sub routes
// api/v1/users
router.get("/", authMiddleware, getUserDetail);
router.get("/all", authMiddleware, IsAdmin, getAllUsers);
router.post("/add", authMiddleware, IsAdmin, addUser);
router.patch("/role", authMiddleware, IsAdmin, updateUserRole);

export default router;
