import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import { Book } from "../models/bookModel.js";
import { config } from "../config/config.js";

const MONGO_URL = config.mongo_url;

const reset = async () => {
  await User.deleteMany({});
  console.log("User deleted");

  await Book.deleteMany({});
  console.log("Book deleted");
};

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MONGO CONNECTED");
    reset().finally(() => {
      process.exit(0);
    });
  })
  .catch((err) => {
    console.log(err);
  });
