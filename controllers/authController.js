const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.memberAuth_get = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED YET: member authentication get");
});

exports.memberAuth_post = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED YET: member authentication post");
});

exports.login_get = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED YET: login page get");
});

exports.login_post = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED YET: login page post");
});

exports.signUp_get = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED YET: sign up page get");
});

exports.signUp_post = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED YET: sign up page post");
});

exports.logout_get = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED YET: logout page get");
});

exports.logout_post = asyncHandler((req, res, next) => {
  res.send("NOT IMPLEMENTED YET: logout page post");
});
