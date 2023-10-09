const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.homePage = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED YET: home page");
});

exports.createMessage_get = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED YET: create message get");
});

exports.createMessage_post = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED YET: create message post");
});

exports.deleteMessage_get = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED YET: delete message get");
});

exports.deleteMessage_post = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED YET: delete message post");
});
