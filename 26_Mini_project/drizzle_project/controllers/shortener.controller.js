import crypto from "crypto";
import {
  getAllShortLinks,
  getShortLinkByShortCode,
  insertShortLink,
} from "../services/shortener.services.js";

export const getShortenerPage = async (req, res) => {
  try {
    const links = await getAllShortLinks();
    res.render("index", { links, host: req.host });
  } catch (error) {
    console.error("Error in GET /:", error);
    res.status(500).send("❌ Internal server Error getShortenerPage");
  }
};

export const postURLShortener = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
    const link = await getShortLinkByShortCode(finalShortCode);
    if (link) {
      res
        .status(400)
        .send("❌ Short code already exists. Please choose another...");
    }
    await insertShortLink({ url, finalShortCode });
    res.status(201).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Internal server error from postURLShortener");
  }
};

export const redirectToShortLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const link = await getShortLinkByShortCode(shortCode);
    console.log("~ redirectToShortLink ~ link:", link);
    if (!link) return res.status(404).send("❌ 404 error occurred..");
    res.redirect(link.url);
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Internal server error from ");
  }
};