const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    name : { type: String, required: true, minLenth: 3 },
    user : { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    lastUpdated : { type: Date, default: Date.now } 
}, { timestamps : true });

module.exports = mongoose.model("Project", projectSchema);