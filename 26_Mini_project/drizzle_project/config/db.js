// Create connection using drizzle to mysql
import { drizzle } from "drizzle-orm/mysql2";
export const db = drizzle(process.env.DATABASE_URL);