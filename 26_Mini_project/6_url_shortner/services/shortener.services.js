import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();


export const loadLinks = async () => {
  // return shortenerCollection.find().toArray(); // this for mongodb
  // const [rows] = await db.execute("select * from short_links"); // this for mysql
  // return rows;
 
  const allShortLinks = await prisma.shortLink.findMany(); // this for mysql using prisma
  return allShortLinks;
};


export const insertShortLink = async ({ url, shortCode }) => {
  // return shortenerCollection.insertOne(link);  // this for mongodb
  // const [result] = await db.execute(  // this for mysql
  //   `INSERT INTO short_links(short_code, url) VALUES(?, ?)`,
  //   [shortCode, url]
  // );
  // return result;

  const newShortLink = await prisma.shortLink.create({
    data: { shortCode, url },
  });
  return newShortLink;
};


export const getLinkByShortCode = async (shortCode) => {
  // return await shortenerCollection.findOne({ shortCode: shortcode }); // this for mongodb
  // const [row] = await db.execute(  // this for mysql
  //   `SELECT * FROM short_links WHERE short_code=?`,
  //   [shortCode]
  // );
  
  const shortLink = await prisma.shortLink.findUnique({
    where: { shortCode: shortCode },
  });
  return shortLink;
};