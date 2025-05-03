import { Router } from "express";
import { students } from "../data/studentsData.js";
import { postURLShortener } from "../controllers/postshortener.controller.js";
import { redirectToShortLink, getShortenerPage, } from "../controllers/getshortener.controller.js";

const router = Router();

router.get("/report", (req, res) => { // This is for show report.ejs file to browser
  res.render("report", { students });
});

router.get("/", getShortenerPage);

router.post("/", postURLShortener);

router.get("/:shortCode", redirectToShortLink);

export const shortenerRoutes = router;