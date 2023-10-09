const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const messageSchema = new Schema({
  title: { type: String, maxLength: 100, required: true },
  timestamp: { type: Date, default: Date.now },
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

messageSchema.virtual("timestampFormatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Message", messageSchema);
