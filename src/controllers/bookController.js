import { Book } from "../models/bookModel.js";

export const createBook = async (req, res) => {
  try {
    let newBook = req.body;

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).send("No file uploaded or invalid file type.");
    }

    // File is already uploaded to S3 by multer-s3, get the URL
    newBook.thumbnail = req.file.location;

    const data = await Book.insertOne(newBook);
    return res.send({
      status: "success",
      message: "book registeration succesful",
      book: data,
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes("E11000")) {
      return res.send({
        status: "error",
        message: "book Already registered!",
      });
    }
    return res.send({
      status: "error",
      message: "Error creating book",
    });
  }
};

export const getBooks = async (req, res) => {
  try {
    const data = await Book.find();
    return res.send({
      status: "success",
      message: "book fetched successfully",
      books: data,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error fetching books",
    });
  }
};

export const getPublicBooks = async (req, res) => {
  try {
    let page = parseInt(req.query?.page) || 1;

    // 1-13
    // limit : 5 per page
    // page 1 - 1,2,3,4,5 , skip : 0 = (pageno - 1) * limit
    // page 2 - 6,7,8,9,10, skip : 5 = (2 - 1) * 5
    // page 3 - 11,12,13 , skip : 10 = (3 - 1) * 5

    const limit = parseInt(req.query?.limit) || 5;
    const skip = (page - 1) * limit;

    const search = req.query?.search || "";

    const filter = {
      $and: [
        { status: "active" },
        { title: { $regex: search, $options: "i" } },
      ],
    };

    const data = await Book.find(filter).skip(skip).limit(limit);

    const totalPage = Math.ceil(
      parseInt(await Book.countDocuments(filter)) / limit,
    );

    return res.send({
      status: "success",
      message: "book fetched successfully",
      books: data,
      totalPage,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error fetching books",
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatepayload = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updatepayload, {
      new: true,
    });
    return res.send({
      status: "success",
      message: "book updated successfully",
      book: book,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error updating book",
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByIdAndDelete(bookId);
    return res.send({
      status: "success",
      message: "book deleted successfully",
      book: book,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error deleting book",
    });
  }
};

export const searchBooks = async (req, res) => {
  try {
    // /search?query=test
    const { query } = req.query;

    // // title = "test"
    // // or
    // // author = "test"
    // Book.find({ title: "test" });
    // or;
    // Book.find({ author: "test" });

    // // test123 or 123test

    const data = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
        { isbn: { $regex: query, $options: "i" } },
      ],
    });
    return res.status(200).send({
      status: "success",
      message: "book fetched successfully",
      books: data,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error fetching books",
    });
  }
};
