// import * as z from "zod";

// const testObject = {
//   email: "test@gmail.com",
//   password: "testted",
// };

// const testObjectSchema = z
//   .object({
//     email: z.email(),
//     password: z.string().min(6).max(10),
//   })
//   .strict();

// const data = testObjectSchema.parse(testObject);

// console.log(data);

const testValue = "string";

let data = Buffer.from(testValue).toString("base64");

data = Buffer.from(data).toString("base64");

console.log(data);

let decodeData = Buffer.from(data, "base64").toString();
decodeData = Buffer.from(decodeData, "base64").toString();

console.log(decodeData);
