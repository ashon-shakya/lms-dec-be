import mongoose from "mongoose";
const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        isbn: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        genre: {
            type: String,
            required: true,
        },
        publicationYear: {
            type: Number,
            required: true,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        },
        expectedDate: {
            type: Date,
            default: null
        },
        averageRating: {
            type: Number,
            default: 0,
        },

    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model("Book", bookSchema);
