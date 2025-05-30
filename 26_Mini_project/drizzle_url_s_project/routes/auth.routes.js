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

router.route("/profile").get(authControllers.getProfilePage);                            // vidoe 96

router.route("/verify-email").get(authControllers.getVerifyEmailPage);                   // video 100

router.route("/resend-verification-link").post(authControllers.resendVerificationLink);  // video 101

router.route("/verify-email-token").get(authControllers.verifyEmailToken);               // video 105


router.route("/edit-profile")                                  // video 112. step 1. for edit profile name
  .get(authControllers.getEditProfilePage)
  .post(authControllers.postEditProfile);


router.route("/change-password")
  .get(authControllers.getChangePasswordPage)                 // video 114. step 1 change password
  .post(authControllers.postChangePassword);                  // video 115. step 1


router.route("/reset-password")
  .get(authControllers.getResetPasswordPage)                 // video 117. step 1. forgot password
  .post(authControllers.postResetPassword);                  // video 118. reset password link & and store db


router.route("/reset-password/:token")
  .get(authControllers.getResetPasswordTokenPage)            // video 121.
  .post(authControllers.postResetPasswordToken);             // video 122.


router.route("/google")
  .get(authControllers.getGoogleLoginpage);                  // video 124. google login page

router.route("/google/callback")
  .get(authControllers.getGoogleLoginCallback);              // video 124


router.route("/github")
  .get(authControllers.getGithubLoginPage);                  // video 125. github login page

router.route("/github/callback")
  .get(authControllers.getGithubLoginCallback);              // video 125


  
router.route("/logout").get(authControllers.logoutUser);

export const authRoutes = router;