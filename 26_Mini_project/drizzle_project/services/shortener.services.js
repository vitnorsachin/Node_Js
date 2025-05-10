import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { shortLinkTable } from "../drizzle/schema.js";

export const getAllShortLinks = async () => {
  return await db.select().from(shortLinkTable);
};

export const getShortLinkByShortCode = async (shortCode) => {
  const [result] = await db
    .select()
    .from(shortLinkTable)
    .where(eq(shortLinkTable.shortCode, shortCode));
  return result;
};

export const insertShortLink = async ({ url, finalShortCode }) => {
  await db.insert(shortLinkTable).values({ url, short_code: finalShortCode });
};