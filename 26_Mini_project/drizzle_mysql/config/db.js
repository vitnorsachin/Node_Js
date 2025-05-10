// step 2. make connection in MySQL using drizzle
import { drizzle } from "drizzle-orm/mysql2";
export const db = drizzle(process.env.DATABASE_URL);