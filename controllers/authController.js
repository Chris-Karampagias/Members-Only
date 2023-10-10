const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.memberAuth_get = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED YET: member authentication get");
});

exports.memberAuth_post = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED YET: member authentication post");
});

exports.login_get = asyncHandler((req, res, next) => {
  res.render("log-in-form");
});

exports.login_post = passport.authenticate("local", {
  failureRedirect: "/clubhouse/login",
  successRedirect: "/clubhouse",
});
exports.signUp_get = (req, res, next) => {
  res.render("sign-up-form", {
    user: undefined,
    errors: null,
  });
};

exports.signUp_post = [
  body("email")
    .custom(async (value) => {
      const user = await User.find({ email: value });
      if (user.email === value) {
        throw new Error();
      } else {
        return true;
      }
    })
    .withMessage("Email is already in use")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Email is required")
    .escape(),
  body("firstName", "First name is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastName", "Last name is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password is required").trim().isLength({ min: 1 }).escape(),
  body("passwordConfirm")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match")
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    let isAdmin;
    if (req.body.isAdmin) {
      isAdmin = true;
    } else {
      isAdmin = false;
    }
    if (!errors.isEmpty()) {
      const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        isMember: false,
        isAdmin: isAdmin,
      });
      res.render("sign-up-form", {
        user: user,
        errors: errors.array(),
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        if (isAdmin) {
          const user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword,
            isMember: true,
            isAdmin: isAdmin,
          });
          await user.save();
        } else {
          const user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword,
            isMember: false,
            isAdmin: isAdmin,
          });
          await user.save();
        }
      });

      res.redirect("/clubhouse/login");
    }
  }),
];

exports.logout_get = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/clubhouse");
  });
};
