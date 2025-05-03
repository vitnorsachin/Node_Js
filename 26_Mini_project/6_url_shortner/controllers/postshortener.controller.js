import crypto from "crypto";
import { loadLinks, saveLinks } from "../models/shortener.model.js";

// Get Data from index.ejs page
export const postURLShortener = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

    const links = await loadLinks();

    if (links[finalShortCode]) {
      res
        .status(400)
        .send("Short code already exists. Please choose another...");
    }

    links[finalShortCode] = url;

    await saveLinks(links);
    res.status(201).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error from postURLShortener");
  }
};