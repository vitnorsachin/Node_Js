// 6️⃣. Crud, database all operation on this file
import { urls } from "../schemas/url_schema.js";


export const getShortenerPage = async (req, res) => {
  try {
    const links = await urls.find(); // 🟢
    res.render("index", { links, host: req.host });
  } catch (error) {
    console.error("Error in GET /:", error);
    res.status(500).send("❌ Internal server Error getShortenerPage");
  }
};


export const postURLShortener = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const links = await urls.find(); //🟢
    if (links[shortCode]) {
      res
        .status(400)
        .send("❌ Short code already exists. Please choose another...");
    }
    await urls.create({ url, shortCode }); //🟢
    res.status(201).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Internal server error from postURLShortener");
  }
};


export const redirectToShortLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const link = await urls.findOne({ shortCode: shortCode });  //🟢
    console.log("~ redirectToShortLink ~ link:", link);
    if (!link) return res.status(404).send("❌ 404 error occurred..");
    res.redirect(link.url);
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Internal server error from ");
  }
};