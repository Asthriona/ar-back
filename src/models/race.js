const { model, Schema } = require("mongoose");

const raceSchema = new Schema({
    name: String,
    title: String,
    images: [String],
    date: Date,
    winner: { type: Schema.Types.ObjectId, ref: 'Driver' },
    participant: [{ type: Schema.Types.ObjectId, ref: 'Driver' },]
});

module.exports = model("Race", raceSchema);