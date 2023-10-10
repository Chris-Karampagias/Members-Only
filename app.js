require("dotenv").config();
require("./config/passportConfig");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const logger = require("morgan");
const ejsExtend = require("express-ejs-extend");
const mongoose = require("mongoose");

const indexRouter = require("./routes");
const clubhouseRouter = require("./routes/clubhouse");

const app = express();

//production config
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

app.use(compression());
app.use(helmet());
app.use(limiter);

//MongoDB database connection
mongoose
  .connect(process.env.MONGO_URL_PROD, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
const db = mongoose.connection;

// view engine setup
app.engine("ejs", ejsExtend);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//session config
const sessionConfig = session({
  secret: process.env.SESSION_SECRET_PROD,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, //1 day
  },
});
app.use(sessionConfig);

//passport config
app.use(passport.initialize());
app.use(passport.session());

//app config
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public/stylesheets")));

//router config
app.use("/", indexRouter);
app.use("/clubhouse", clubhouseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
