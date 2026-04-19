import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Routers
import authRouter from "./src/routers/authRouter.js";
import userRouter from "./src/routers/userRouter.js";
import bookRouter from "./src/routers/bookRouter.js";
import borrowRouter from "./src/routers/borrowRouter.js";
import reviewRouter from "./src/routers/reviewRouter.js";
// config
import { config } from "./src/config/config.js";

const app = express();
const PORT = config.port;
const MONGO_URL = config.mongo_url;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  return res.send({
    status: "success",
    message: "LMS API",
  });
});

// auth router
// /api/v1/auth
app.use("/api/v1/auth", authRouter);

// user router
// /api/v1/users
app.use("/api/v1/users", userRouter);

// book router
app.use("/api/v1/books", bookRouter);

// borrow router
app.use("/api/v1/borrows", borrowRouter);

// review Router
app.use("/api/v1/reviews", reviewRouter);

mongoose
  .connect(MONGO_URL) // MONGO URL --> Connection string
  .then(() => {
    console.log("MONGO CONNECTED", MONGO_URL);
    app.listen(PORT, (error) => {
      if (error) {
        console.log(error);
        console.log("SERVER did not start!");
      } else {
        console.log("Server started at PORT: ", PORT);
      }
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("ERROR MONGO");
  });
