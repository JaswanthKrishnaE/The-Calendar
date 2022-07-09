const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String,
    email:String,
    password:String,
    eventDate: [
      {
        date: [Number],
        events: [String],
      }
    ]
  });

const User = mongoose.model("User", userSchema);


module.exports = {User}
