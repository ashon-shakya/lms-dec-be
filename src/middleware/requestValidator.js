import * as z from "zod";

export const registerUserValidator = async (req, res, next) => {
  try {
    const newUserSchema = z
      .object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.email(),
        password: z.string().min(6).max(16),
        phone: z.string().length(10),
        confirmPassword: z.string().min(6),
      })
      .refine((fields) => fields.password === fields.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords don't match",
      })
      .strict();

    const data = newUserSchema.parse(req.body);
    next();
  } catch (error) {
    console.log(error.message);
    return res.send({
      status: "error",
      message: error.message,
    });
  }
};

export const loginUserValidator = async (req, res, next) => {
  try {
    const loginSchema = z
      .object({
        email: z.email(),
        password: z.string().min(1, "Password is required"),
      })
      .strict();
    const data = loginSchema.parse(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: error.message,
    });
  }
};

export const createBookValidator = async (req, res, next) => {
  try {
    const bookSchema = z
      .object({
        title: z.string(),
        author: z.string(),
        // thumbnail: z.string(),
        isbn: z.string(),
        genre: z.string(),
        publicationYear: z.string(),
        status: z.enum(["active", "inactive"]).default("inactive"),
      })
      .strict();
    console.log("REQ BODY", req.body);
    const data = bookSchema.parse(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: error.message,
    });
  }
};
