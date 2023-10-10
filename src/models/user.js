const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    username: String,
    password: String,
    avatar: { type: String, default: "https://cdn.nishikino.xyz/asthriona/ProfilePict/default.jpg" },
    isAdmin: { type: Boolean, default: false }
});

module.exports = model("user", userSchema);