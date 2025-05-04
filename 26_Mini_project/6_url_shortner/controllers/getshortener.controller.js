import { loadLinks, getLinkByShortCode } from "../models/shortener.model.js";

// Show page index.ejs file to browser
export const getShortenerPage = async (req, res) => {
  try {
    const links = await loadLinks();
    res.render("index", { links, host: req.host });
  } catch (error) {
    console.error("Error in GET /:", error);
    res.status(500).send("Internal server Error");
  }
};

// This is for redirect links
export const redirectToShortLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const link = await getLinkByShortCode(shortCode);

    if (!link) return res.redirect("/404");

    res.redirect(link.url);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error from ");
  }
};