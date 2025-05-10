// 1️⃣. for mongoDb connection
// import dotenv from "dotenv";
// dotenv.config();
// import { z } from "zod";
// export const env = z
//   .object({
//     PORT: z.coerce.number().default(3000),
//     MONGODB_URL: z.string(),
//     MONGODB_DATABASE_NAME: z.string(),
//   })
//   .parse(process.env);


// 2️⃣. using mongoose connection
// import dotenv from "dotenv";
// dotenv.config();
// import { z } from "zod";
// export const env = z
//   .object({
//     PORT: z.coerce.number().default(3000),
//     MONGODB_URL: z.string(),
//   })
//   .parse(process.env);


// 3️⃣. for MySQL connection
// import dotenv from "dotenv";
// dotenv.config();
// import { z } from "zod";

// export const env = z
//   .object({
//     PORT: z.coerce.number().default(3001),
//     DATABASE_HOST: z.string(),
//     DATABASE_USER: z.string(),
//     DATABASE_PASSWORD: z.string(),
//     DATABASE_NAME: z.string(),
//   })
//   .parse(process.env);