const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.homePage = asyncHandler((req, res, next) => {
  res.render("home", {
    isLoggedIn: req.user === undefined ? false : true,
    isMember: req.user && req.user.isMember === true ? true : false,
  });
});

exports.createMessage_get = (req, res, next) => {
  res.render("message-form", {
    user: req.user,
    message: undefined,
    isLoggedIn: true,
    isMember: req.user && req.user.isMember === true ? true : false,
    errors: null,
  });
};

exports.createMessage_post = [
  body("title", "Title is required").trim().isLength({ min: 1 }).escape(),
  body("content", "Content is required").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const message = new Message({
      title: req.body.title,
      content: req.body.content,
      user: req.user._id,
    });

    if (!errors.isEmpty()) {
      res.render("message-form", {
        user: req.user,
        message: message,
        isLoggedIn: true,
        isMember: req.user && req.user.isMember === true ? true : false,
        errors: errors.array(),
      });
    } else {
      await message.save();
      res.redirect("/clubhouse");
    }
  }),
];

exports.deleteMessage_get = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED YET: delete message get");
});

exports.deleteMessage_post = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED YET: delete message post");
});
