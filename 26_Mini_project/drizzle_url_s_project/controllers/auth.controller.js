import {clearUserSession,comparePassword,createUser,getUserByEmail,hashPassword,authenticateUser, findUserById, getAllShortLinks} from "../services/auth.services.js";
import { loginUserSchema,registerUserSchema,} from "../validators/auth.validators.js";


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

    await authenticateUser({ req, res, user, name, email }); // video 95. authenticate user

    res.redirect("/");
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