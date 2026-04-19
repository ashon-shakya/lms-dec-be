import express from "express";
import {
  createBook,
  deleteBook,
  getBooks,
  getPublicBooks,
  searchBooks,
  updateBook,
} from "../controllers/bookController.js";
import { authMiddleware, IsAdmin } from "../middleware/authMiddleware.js";
import { createBookValidator } from "../middleware/requestValidator.js";
import { upload } from "../middleware/multerConfig.js";

const router = express.Router();

// define sub routes
// api/v1/books

//Create Books
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createBookValidator,
  IsAdmin,
  createBook,
);

//Get Books for admin
router.get("/", authMiddleware, IsAdmin, getBooks);

//Get Books for admin
router.get("/public", getPublicBooks);

//Update Books
router.patch("/:id", authMiddleware, IsAdmin, updateBook);

//Delete Books by ID
router.delete("/:id", authMiddleware, IsAdmin, deleteBook);

//search books
router.get("/search", searchBooks);

export default router;
