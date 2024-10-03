const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = new Schema({
  id: Number,
  username: {
    type: String,
    required: true,
  },
  funds: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Account", PostSchema);
