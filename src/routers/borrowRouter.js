import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  borrowBook,
  fetchAllBorrows,
  fetchMyBorrows,
  returnBook,
} from "../controllers/borrowBookController.js";

const router = express.Router();

// borrow book router
router.post("/:bookId", authMiddleware, borrowBook);

//Get borrowe Books for admin
router.get("/", fetchAllBorrows);

// display borrowed books router for logged in user
router.get("/my-borrows", authMiddleware, fetchMyBorrows);

// update borrow status / return book
router.patch("/return", authMiddleware, returnBook);

export default router;
