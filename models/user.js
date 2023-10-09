const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, maxLength: 20, required: true },
  firstName: { type: String, maxLength: 20, required: true },
  lastName: { type: String, maxLength: 20, required: true },
  password: { type: String, required: true },
  isMember: { type: Boolean, required: true },
  isAdmin: { type: Boolean, required: true },
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model("User", userSchema);
