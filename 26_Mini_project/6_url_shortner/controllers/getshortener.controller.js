import { loadLinks } from "../models/shortener.model.js";

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
    const links = await loadLinks();

    if (!links[shortCode]) res.status(404).send("404 error occurred");

    res.redirect(links[shortCode]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error from ");
  }
};
