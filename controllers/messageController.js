const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");

exports.homePage = asyncHandler(async (req, res, next) => {
  const count = await mongoose.connection.db
    .collection("messages")
    .countDocuments();
  if (count === 0) {
    res.render("no-messages", { user: req.user });
  } else {
    const messages = await Message.find({})
      .populate("user")
      .orFail("Could not find any messages");
    res.render("home", {
      user: req.user === undefined ? null : req.user,
      messages: messages,
    });
  }
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

exports.deleteMessage_get = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.params.id);
  res.redirect("/clubhouse");
});
