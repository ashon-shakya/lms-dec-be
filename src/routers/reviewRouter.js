import express from "express";
import { authMiddleware, IsAdmin } from "../middleware/authMiddleware.js";
import {
  addReview,
  approveReview,
  deleteReview,
  getReviews,
  getReviewsByBook,
  getPendingReviews,
  updateReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// get pending reviews (admin only) — GET /api/v1/reviews/admin/pending
router.get("/admin/pending", authMiddleware, IsAdmin, getPendingReviews);

// add review — POST /api/v1/reviews/:borrowId
router.post("/:borrowId", authMiddleware, addReview);

// get all reviews — GET /api/v1/reviews/
router.get("/", getReviews);

// get reviews for a specific book — GET /api/v1/reviews/book/:bookId
router.get("/book/:bookId", getReviewsByBook);

// update review — PATCH /api/v1/reviews/:id
router.patch("/:id", authMiddleware, updateReview);

// admin: approve / reject review — PATCH /api/v1/reviews/approve/:id
router.patch("/approve/:id", authMiddleware, IsAdmin, approveReview);

// delete review — DELETE /api/v1/reviews/:id
router.delete("/:id", authMiddleware, deleteReview);

export default router;
