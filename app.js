const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { MONGO_URI } = require("./src/lib/mongoUrl");
const User = require("./src/models/user.model");
const adminRoutes = require("./src/routes/admin.route");
const apiRoutes = require("./src/routes/api.route");
const shopRoutes = require("./src/routes/shop.route");
const authRoutes = require("./src/routes/auth.route");

const store = MongoStore.create({
  mongoUrl: MONGO_URI,
  dbName: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(cors());

const secret = process.env.SECRET;
app.use(
  session({
    secret,
    store,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 360000,
    },
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});
app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);
app.use(shopRoutes);
app.use(authRoutes);

module.exports = app;
