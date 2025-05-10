// import {urls} from "../schemas/url_schema.js";  // {[mongoose]}

// import { insertShortLink, loadLinks, getLinkByShortCode,} from "../models/shortener.model.js"; // {[mysql]}

import { getLinkByShortCode, insertShortLink, loadLinks } from "../services/shortener.services.js";


// Get url data from backend && Show page index.ejs file to browser
export const getShortenerPage = async (req, res) => {
  try {
    // const links = await urls.find(); // when use {[mongoose]} then use this line
    const links = await loadLinks(); // when use {[mysql]} then use this line
    res.render("index", { links, host: req.host });
  } catch (error) {
    console.error("Error in GET /:", error);
    res.status(500).send("❌ Internal server Error getShortenerPage");
  }
};



// Get Data from index.ejs page
export const postURLShortener = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
    // const links = urls.find(); // when use {[mongoose]} then use this line
    // const links = await loadLinks(); // when use {[mysql]} then use this line
    // if (links[finalShortCode]) {

    const link = await getLinkByShortCode(shortCode);
    if (link) {
      res
        .status(400)
        .send("❌ Short code already exists. Please choose another...");
    }
    // await urls.create({ url, shortCode }) // when use {[mongoose]} then use this line
    await insertShortLink({ url: url, shortCode: finalShortCode });// when use {[mysql]} then use this line
    res.status(201).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Internal server error from postURLShortener");
  }
};




// This is for redirect links
export const redirectToShortLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    // const link = await urls.findOne({ shortCode: shortCode })// when use {[mongoose]} then use this line
    const link = await getLinkByShortCode(shortCode);// when use {[mysql]} then use this line
    if (!link) return res.redirect("/404");
    res.redirect(link.url);
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Internal server error from ");
  }
};
