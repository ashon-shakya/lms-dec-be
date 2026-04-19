import { Review } from "../models/reviewModel.js";
import { Borrow } from "../models/borrowModel.js";
import { Book } from "../models/bookModel.js";

// add review
export const addReview = async (req, res) => {
  try {
    const { review, rating } = req.body;
    const userId = req.user._id;
    const { borrowId } = req.params;

    if (!borrowId) {
      return res.status(400).send({
        status: "error",
        message: "borrow id required",
      });
    }

    // fetch the borrow to get bookId and validate it belongs to this user
    const borrow = await Borrow.findById(borrowId);
    if (!borrow) {
      return res.status(404).send({
        status: "error",
        message: "borrow record not found",
      });
    }
    if (borrow.userId.toString() !== userId.toString()) {
      return res.status(403).send({
        status: "error",
        message: "not authorized to review this borrow",
      });
    }
    if (borrow.status !== "returned") {
      return res.status(400).send({
        status: "error",
        message: "you can only review a returned book",
      });
    }
    const reviewData = await Review.insertOne({
      userId,
      bookId: borrow.bookId,
      borrowId,
      review,
      rating,
    });
    if (reviewData) {
      borrow.status = "reviewed";
      await borrow.save();

      return res.status(200).send({
        status: "success",
        message: "review added successfully",
        review: reviewData,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "error while reviewing books",
    });
  }
};

// get all reviews
export const getReviews = async (req, res) => {
  try {
    const data = await Review.find({ isApproved: true })
      .populate("userId", "firstName lastName")
      .populate("bookId", "title thumbnail author genre");

    return res.send({
      status: "success",
      message: "reviews fetched successfully",
      reviews: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "error while fetching reviews",
    });
  }
};

// get reviews by book
export const getReviewsByBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const data = await Review.find({ bookId, isApproved: true }).populate(
      "userId",
      "firstName lastName",
    );

    return res.send({
      status: "success",
      message: "reviews fetched successfully",
      reviews: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "error while fetching reviews",
    });
  }
};

// update review (only by the review owner)
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { review, rating } = req.body;

    const existing = await Review.findById(id);
    if (!existing) {
      return res.status(404).send({
        status: "error",
        message: "review not found",
      });
    }

    if (existing.userId.toString() !== userId.toString()) {
      return res.status(403).send({
        status: "error",
        message: "not authorized to update this review",
      });
    }

    const updated = await Review.findByIdAndUpdate(
      id,
      { review, rating },
      { new: true },
    );

    return res.send({
      status: "success",
      message: "review updated successfully",
      review: updated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "error while updating review",
    });
  }
};

// delete review (only by the review owner)
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const existing = await Review.findById(id);
    if (!existing) {
      return res.status(404).send({
        status: "error",
        message: "review not found",
      });
    }

    if (existing.userId.toString() !== userId.toString()) {
      return res.status(403).send({
        status: "error",
        message: "not authorized to delete this review",
      });
    }

    const deleted = await Review.findByIdAndDelete(id);

    return res.send({
      status: "success",
      message: "review deleted successfully",
      review: deleted,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "error while deleting review",
    });
  }
};

// approve / reject review (admin only)
export const approveReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    const review = await Review.findById(id); // Better: use findById for single document

    if (!review) {
      throw new Error("Review not found"); // or return proper error response
    }
    // if isApproved === true
    // update books average rating

    // 1. get all approved the reviews of that particular book
    // 2. find total rating
    // 3. find no of reviews
    // 4. avgrating = total rating /total review

    review.isApproved = isApproved;
    const bookId = review.bookId;
    await review.save();

    const approvedReviews = await Review.find({ bookId, isApproved: true });

    if (approvedReviews.length > 0) {
      const totalRating = approvedReviews.reduce(
        (acc, item) => acc + item.rating,
        0,
      );
      const averageRating = totalRating / approvedReviews.length;
      console.log(1111, averageRating);
      //update the books avgrating
      const updatBookRating = await Book.findByIdAndUpdate(
        bookId,
        { averageRating },
        { new: true },
      );

      console.log(updatBookRating);
    }

    if (!review) {
      return res.status(404).send({
        status: "error",
        message: "review not found",
      });
    }

    return res.send({
      status: "success",
      message: `review ${isApproved ? "approved" : "rejected"} successfully`,
      review,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "error while approving review",
    });
  }
};

// get pending reviews (admin only)
export const getPendingReviews = async (req, res) => {
  try {
    const data = await Review.find({ isApproved: false })
      .populate("userId", "firstName lastName email")
      .populate("bookId", "title thumbnail author")
      .sort({ createdAt: -1 });

    return res.send({
      status: "success",
      message: "pending reviews fetched successfully",
      reviews: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "error while fetching pending reviews",
    });
  }
};
