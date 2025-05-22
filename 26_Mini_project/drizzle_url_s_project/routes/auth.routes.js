// step 2️⃣. Create routes
import { Router } from "express";
import * as authControllers from "../controllers/auth.controller.js";

const router = Router();

router
  .route("/register")
  .get(authControllers.getRegisterPage)
  .post(authControllers.postRegister);

router
  .route("/login")
  .get(authControllers.getLoginPage)
  .post(authControllers.postLogin);

router.route("/profile").get(authControllers.getProfilePage); // vidoe 96

router.route("/logout").get(authControllers.logoutUser);

export const authRoutes = router;