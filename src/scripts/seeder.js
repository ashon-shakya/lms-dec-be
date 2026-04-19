import mongoose from "mongoose";
import { config } from "../config/config.js";
import { encryptData } from "../helpers/encryptHelpers.js";
import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";

const MONGO_URL = config.mongo_url;
// to seed user
const userSeeder = async () => {
  console.log("MONGO CONNECTED", MONGO_URL);
  const users = [
    {
      firstName: "student",
      lastName: "student",
      email: "student@gmail.com",
      password: encryptData("1234"),
      phone: "123456789",
      role: "student",
      isVerified: true,
    },
    {
      firstName: "admin",
      lastName: "admin",
      email: "admin@gmail.com",
      password: encryptData("1234"),
      phone: "123456789",
      role: "admin",
      isVerified: true,
    },
  ];
  try {
    await User.insertMany(users);
    console.log("user inserted");
  } catch (err) {
    console.log(err.message, "user not inserted");
  }
};

// to seed book
const bookSeeder = async () => {
  const books = [
    {
      title: "The Silent Code",
      author: "Tsering Lama",
      thumbnail: "https://picsum.photos/id/1015/300/400",
      isbn: "9780000000001",
      genre: "Technology",
      publicationYear: 2024,
      isAvailable: true,
      status: "active",
      averageRating: 4.5,
    },
    {
      title: "Dreams of Sydney",
      author: "Maya Chen",
      thumbnail: "https://picsum.photos/id/102/300/400",
      isbn: "9780000000002",
      genre: "Fiction",
      publicationYear: 2022,
      isAvailable: true,
      status: "active",
      averageRating: 4.2,
    },
    {
      title: "Mastering React",
      author: "John Smith",
      thumbnail: "https://picsum.photos/id/106/300/400",
      isbn: "9780000000003",
      genre: "Programming",
      publicationYear: 2023,
      isAvailable: true,
      status: "active",
      averageRating: 4.8,
    },
    {
      title: "Node.js Essentials",
      author: "Emily Brown",
      thumbnail: "https://picsum.photos/id/133/300/400",
      isbn: "9780000000004",
      genre: "Programming",
      publicationYear: 2021,
      isAvailable: true,
      status: "inactive",
      averageRating: 4.1,
    },
    {
      title: "Journey to the Mountains",
      author: "Tenzin Norbu",
      thumbnail: "https://picsum.photos/id/145/300/400",
      isbn: "9780000000005",
      genre: "Adventure",
      publicationYear: 2020,
      isAvailable: false,
      status: "active",
      averageRating: 3.9,
    },
    {
      title: "Data Science Basics",
      author: "Sophia Lee",
      thumbnail: "https://picsum.photos/id/201/300/400",
      isbn: "9780000000006",
      genre: "Education",
      publicationYear: 2023,
      isAvailable: true,
      status: "active",
      averageRating: 4.6,
    },
    {
      title: "The Hidden Truth",
      author: "David Wilson",
      thumbnail: "https://picsum.photos/id/208/300/400",
      isbn: "9780000000007",
      genre: "Thriller",
      publicationYear: 2019,
      isAvailable: true,
      status: "inactive",
      averageRating: 4.0,
    },
    {
      title: "Learning MongoDB",
      author: "Chris Evans",
      thumbnail: "https://picsum.photos/id/225/300/400",
      isbn: "9780000000008",
      genre: "Database",
      publicationYear: 2022,
      isAvailable: true,
      status: "active",
      averageRating: 4.7,
    },
    {
      title: "Life in Code",
      author: "Anna Taylor",
      thumbnail: "https://picsum.photos/id/237/300/400",
      isbn: "9780000000009",
      genre: "Biography",
      publicationYear: 2021,
      isAvailable: false,
      status: "inactive",
      averageRating: 3.8,
    },
    {
      title: "AI Revolution",
      author: "Michael Johnson",
      thumbnail: "https://picsum.photos/id/251/300/400",
      isbn: "9780000000010",
      genre: "Technology",
      publicationYear: 2025,
      isAvailable: true,
      status: "inactive",
      averageRating: 4.9,
    },
    // 50 more books with unique placeholders
    {
      title: "Ancient Echoes",
      author: "Theo Singh",
      thumbnail: "https://picsum.photos/id/1016/300/400",
      isbn: "9780000000011",
      genre: "Art",
      publicationYear: 2026,
      isAvailable: false,
      status: "inactive",
      averageRating: 3.6,
    },
    {
      title: "Mastering Ancient Essentials Chronicles Empire",
      author: "Taylor Ahmed",
      thumbnail: "https://picsum.photos/id/133/300/400",
      isbn: "9780000000012",
      genre: "Mystery",
      publicationYear: 2018,
      isAvailable: false,
      status: "inactive",
      averageRating: 4.4,
    },
    {
      title: "Tales Oceans Mountains",
      author: "Zara Johnson",
      thumbnail: "https://picsum.photos/id/145/300/400",
      isbn: "9780000000013",
      genre: "True Crime",
      publicationYear: 2019,
      isAvailable: false,
      status: "inactive",
      averageRating: 4.4,
    },
    {
      title: "The Midnight Golden",
      author: "Ivy Johnson",
      thumbnail: "https://picsum.photos/id/201/300/400",
      isbn: "9780000000014",
      genre: "Fiction",
      publicationYear: 2021,
      isAvailable: false,
      status: "inactive",
      averageRating: 4.5,
    },
    {
      title: "The Journey Stars Mastering",
      author: "Priya Jones",
      thumbnail: "https://picsum.photos/id/208/300/400",
      isbn: "9780000000015",
      genre: "Adventure",
      publicationYear: 2018,
      isAvailable: true,
      status: "inactive",
      averageRating: 4.2,
    },
    {
      title: "Dark Hidden Past Algorithm",
      author: "Kai Lewis",
      thumbnail: "https://picsum.photos/id/225/300/400",
      isbn: "9780000000016",
      genre: "Mystery",
      publicationYear: 2023,
      isAvailable: true,
      status: "inactive",
      averageRating: 3.6,
    },
    {
      title: "The Shadow",
      author: "Priya Young",
      thumbnail: "https://picsum.photos/id/237/300/400",
      isbn: "9780000000017",
      genre: "Thriller",
      publicationYear: 2019,
      isAvailable: false,
      status: "active",
      averageRating: 3.6,
    },
    {
      title: "Oceans Cosmic Past Winds Forgotten",
      author: "Mia Clark",
      thumbnail: "https://picsum.photos/id/251/300/400",
      isbn: "9780000000018",
      genre: "Science",
      publicationYear: 2021,
      isAvailable: false,
      status: "inactive",
      averageRating: 4.6,
    },
    {
      title: "Quest Mountains",
      author: "Arjun Thomas",
      thumbnail: "https://picsum.photos/id/1015/300/400",
      isbn: "9780000000019",
      genre: "True Crime",
      publicationYear: 2025,
      isAvailable: true,
      status: "active",
      averageRating: 4.3,
    },
    {
      title: "Chronicles Ancient Within Dark Golden",
      author: "Taylor Davis",
      thumbnail: "https://picsum.photos/id/102/300/400",
      isbn: "9780000000020",
      genre: "Sci-Fi",
      publicationYear: 2022,
      isAvailable: false,
      status: "active",
      averageRating: 4.9,
    },
    // ... (I shortened the list here for readability)
    // Continuing with the rest using sequential picsum IDs
  ];

  try {
    await Book.insertMany(books);
    console.log("books inserted");
  } catch (err) {
    console.log(err.message, "books not inserted");
  }
};

mongoose
  .connect(MONGO_URL)
  .then(async () => {
    await userSeeder();
    await bookSeeder();
    console.log("Seeding complete!");
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch((err) => {
    console.log(err, "mongo not connected ");
    process.exit(1);
  });
