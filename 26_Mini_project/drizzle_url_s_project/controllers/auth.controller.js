import { loginUserSchema,registerUserSchema, verifyEmailSchema,} from "../validators/auth.validators.js";
import {
  clearUserSession,
  comparePassword,
  createUser,
  getUserByEmail,
  hashPassword,
  authenticateUser, 
  findUserById, 
  getAllShortLinks, 
  findVerificationEmailToken, 
  verifyUserEmailAndUpdate, 
  clearVerifyEmailTokens, 
  sendNewVerifyEmailLink
} from "../services/auth.services.js";


export const getRegisterPage = (req, res) => {// 1️⃣. Get "register.ejs" file & 'render'
  // video : 83. step 3. Pass errors
  res.render("../views/auth/register", { errors: req.flash("errors") }); //🟢 path of register file ([step 3️⃣. give path of ejs file])
};

export const postRegister = async (req, res) => {
  // 1️⃣. Register
  try {
    if (req.user) res.redirect("/");

    const { data, error } = registerUserSchema.safeParse(req.body); // video 86. step 2.
    if (error) {
      const errors = error.errors[0].message;
      req.flash("errors", errors);
      res.redirect("/register");
    }
    const { name, email, password } = data;

    const userExists = await getUserByEmail(email);
    if (userExists) {
      req.flash("errors", "User already exists..!"); // video : 83 step 2
      return res.redirect("/register");
    }

    const hashedPassword = await hashPassword(password); // video : 78
    const [user] = await createUser({ name, email, password: hashedPassword });
    console.log("User Register: ", user);

    // res.status(201).redirect("/login");

    await authenticateUser({ req, res, user, name, email });  // video 95. authenticate user

    await sendNewVerifyEmailLink({ email, userId: user.id }); // video 108. send verifyemail during register

    // res.redirect("/");
    res.redirect('/verify-email');                            // video 108. after register goto verify email
  } catch (error) {
    console.error(error);
    res.status(201).send("❌ Internal server error from registerLogin..");
  }
};


export const getLoginPage = (req, res) => {// 2️⃣. Get 'login.ejs' file and 'render'
  res.render("auth/login", { errors: req.flash("errors") });
};

export const postLogin = async (req, res) => {  // 2️⃣. Login
  const { data, error } = loginUserSchema.safeParse(req.body); // video 86. step 2.
  if (error) {
    const errors = error.errors[0].message;
    req.flash("errors", errors);
    res.redirect("/login");
  }

  const { email, password } = data;
  const user = await getUserByEmail(email);

  if (!user) {
    req.flash("errors", "Invalid Email or Password"); // video 83. step 2
    return res.redirect("/login");
  }

  const isPasswordValid = await comparePassword(password, user.password); // video : 78
  if (!isPasswordValid) {
    req.flash("errors", "Invalid Email or Password"); // video 83. step 2
    return res.redirect("/login");
  }

  await authenticateUser({ req, res, user }); // video 95. authenticate user

  res.redirect("/");
};


export const logoutUser = async (req, res) => {// video 82. For User Logout..
  await clearUserSession(req.user.sessionId);
  res.clearCookie("access_token"); // video 93.
  res.clearCookie("refresh_token");
  res.redirect("/login");
};


export const getProfilePage = async (req, res) => {// video 81. For get Profile
  if (!req.user) return res.send(`<h2 style="color: red; text-align: center;">Not logged In.</h2>`);

  const user = await findUserById(req.user.id);// video. 96
  if(!user) return res.redirect('/login');

  const userShortLinks = await getAllShortLinks(user.id);

  res.render("auth/profile", {
    user: {
      id           : user.id,
      name         : user.name,
      email        : user.email,
      isEmailValid : user.isEmailValid,    // video 97
      createdAt    : user.createdAt,
      links        : userShortLinks,
    },
  });
};


export const getVerifyEmailPage = async (req, res) => {   // video 100
  if(!req.user) return res.redirect("/");

  const user = await findUserById(req.user.id);
  if(!user || user.isEmailValid) return res.redirect("/");
  
  return res.render("auth/verify-email", {email: req.user.email});
}


export const resendVerificationLink = async (req, res) => { // video 101
  if(!req.user) return res.redirect("/");
  const user = await findUserById(req.user.id);
  if(!user || user.isEmailValid) return res.redirect("/");

  await sendNewVerifyEmailLink({ email: req.user.email, userId: req.user.id }); // video 108. send mail after registration

  // const randomToken = generateRandomToken();

  // await insertVerifyEmailToken({ userId: req.user.id, token: randomToken });

  // const verifyEmailLink = await createVerifyEmailLink({
  //   email : req.user.email,
  //   token : randomToken,
  // });

  // sendEmail({                             // video 102. send email using "nodemailer"
  //   to : req.user.email,
  //   subject : "Verify your email",
  //   html: `<h1>Click the link below to verify your email</h1>
  //          <p>You can use this token: <code style="font-size: 15px; font-weight: bold;">${randomToken}</code></p>
  //          <a href="${verifyEmailLink}">Verify Email</a>
  //         `,
  // }).catch(console.error);

  res.redirect('/verify-email');
};


export const verifyEmailToken = async (req, res) => {       // video 105. verify "email" & "token"
  const { data, error } = verifyEmailSchema.safeParse(req.query);

  if (error) {
    return res.send("Verifiaction link invalid or expired..!");
  }

  // const token = await findVerificationEmailToken(data); // for without joins
  const [token] = await findVerificationEmailToken(data); // video 107. for joins

  console.log("verifyEmailToken ~ token: ", token);
  if(!token) res.send("Verifiaction link invalid or expired..");

  await verifyUserEmailAndUpdate(token.email);

  clearVerifyEmailTokens(token.userId).catch(console.error);

  return res.redirect('/profile');
}