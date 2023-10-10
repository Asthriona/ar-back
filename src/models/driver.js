const { model, Schema } = require("mongoose");

const raceSchema = new Schema({
    name: String,
    carNbr: Number,
    team: { type: String, default: null},
    image: String,
    userId: String,
});

module.exports = model("Driver", raceSchema);