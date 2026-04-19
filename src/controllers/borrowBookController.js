import { Borrow } from "../models/borrowModel.js";
import { Book } from "../models/bookModel.js";

export const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user._id;
    if (!bookId) {
      return res.send({
        status: "error",
        message: "book id not found",
      });
    }
    if (!userId) {
      return res.send({
        status: "error",
        message: "userId id not found",
      });
    }

    const book = await Book.findOne({ _id: bookId });

    console.log(book);
    if (book && book.status === "active" && book.isAvailable) {
      const dueDate = new Date();
      // calculate due date
      // 15 days from today
      dueDate.setDate(dueDate.getDate() + 15);

      const borrowData = await Borrow.insertOne({
        bookId,
        userId,
        dueDate,
      });
      if (borrowData) {
        book.isAvailable = false;
        book.expectedDate = dueDate;
        await book.save();

        return res.send({
          status: "success",
          message: "Book borrowed successful",
        });
      } else {
        return res.status(500).send({
          status: "error",
          message: "Failed to borrow Book",
        });
      }
    } else {
      return res.status(400).send({
        status: "error",
        message: "Book Not Available!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "error while borrwing book",
    });
  }
};

export const fetchAllBorrows = async (req, res) => {
  try {
    const data = await Borrow.find()
      .populate("userId", "firstName lastName")
      .populate("bookId", "title thumbnail author genre");
    return res.send({
      status: "success",
      message: "borrowed book fetched successfully",
      borrow: data,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error fetching  borrowed books",
    });
  }
};

// fetch all borrows for logged in user
export const fetchMyBorrows = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.send({
        status: "error",
        message: "userId id not found",
      });
    }
    const borrows = await Borrow.find({ userId })
      .populate("userId", "firstName lastName")
      .populate("bookId", "title thumbnail author genre");
    return res.send({
      status: "success",
      message: "borrows fetched successfully",
      borrows,
    });
  } catch (error) {
    return res.send({
      status: "error",
      message: "error while fetching borrows",
    });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.send({
        status: "error",
        message: "borrow id and status required",
      });
    }

    const borrow = await Borrow.findOne({ _id });

    if (borrow && borrow.status === "borrowed") {
      const updateData = { status: "returned" };
      updateData.returnDate = new Date();

      const updateBorrow = await Borrow.findByIdAndUpdate(_id, updateData, {
        new: true,
      });

      if (updateBorrow) {
        await Book.findByIdAndUpdate(updateBorrow.bookId, {
          isAvailable: true,
          expectedDate: null,
        });

        return res.status(200).send({
          status: "success",
          message: "Book returned successfully",
          updateBorrow,
        });
      } else {
        return res.status(500).send({
          status: "error",
          message: "failed to return book",
        });
      }
    } else {
      console.log(2222, borrow);
      return res.status(400).send({
        status: "error",
        message: "Book Failed to return!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "error while returning book",
    });
  }
};
