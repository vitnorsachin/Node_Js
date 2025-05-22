// Step 2️⃣. Zod Validation(option)
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

export const env = z
  .object({
    PORT: z.coerce.number().default(3000) || 3001,
    MONGODB_URL: z.string(),
  })
  .parse(process.env);