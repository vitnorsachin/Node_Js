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

    await saveLinks({ url, shortCode });

    res.status(201).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error from postURLShortener");
  }
};