const validator = require("validator");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.getLogin = (req, res) => {
  const { isLoggedIn, isAdmin } = req.session;
  res.render("auth/login", {
    path: "/login",
    isLoggedIn,
    isAdmin,
    errors: [],
    oldInput: {
      email: "",
      password: "",
    },
  });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const errors = [];
  email.trim().toLowerCase();
  if (!validator.isEmail(email)) {
    errors.push("Email is invalid!");
  }
  const user = await User.findOne({ email });
  if (user) {
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      errors.push("Email or password are wrong");
    }
  } else {
    errors.push("Email or password are wrong");
  }
  if (errors.length > 0) {
    return res.render("auth/login", {
      path: "/login",
      isLoggedIn: false,
      isAdmin: false,
      errors,
      oldInput: {
        email,
        password,
      },
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = user;
  if (user.email === "admin@admin.com") {
    req.session.isAdmin = true;
  }
  await req.session.save();
  res.redirect("/");
};

exports.postLogout = async (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  const { isLoggedIn, isAdmin } = req.session;
  console.log(`${req.method} ${res.baseUrl}`);
  res.render("./auth/signup", {
    path: "/signup",
    isLoggedIn,
    isAdmin,
    errors: [],
    oldInput: {
      email: "",
      password: "",
    },
  });
};

exports.postSignup = async (req, res) => {
  const { email, password, passwordCheck } = req.body;
  const errors = [];
  email.trim().toLowerCase();
  if (!validator.isEmail(email)) {
    errors.push("Email is invalid!");
  }
  if (!validator.isLength(password, { min: 4 })) {
    errors.push("Password must be minimum 4 characters!");
  }
  if (password !== passwordCheck) {
    errors.push("Password must be the same!");
  }
  if (errors.length > 0) {
    return res.render("auth/signup", {
      path: "/signup",
      isLoggedIn: false,
      isAdmin: false,
      errors,
      oldInput: {
        email,
        password,
      },
    });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);
    const user = new User({
      email,
      password: hashedPwd,
      cart: { items: [] },
    });
    await user.save();
    res.redirect("/login");
  } catch (error) {
    console.log({ error });
    res.render("/shop", { path: "/", isLoggedIn: false });
  }
};
