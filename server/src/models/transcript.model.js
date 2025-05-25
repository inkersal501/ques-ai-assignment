const mongoose = require("mongoose");

const transcriptSchema = mongoose.Schema({
    project : {type: mongoose.Schema.Types.ObjectId, ref:"Project"},
    name : {type: String, required: true, minLength: 3},
    transcript : {type: String, required: true, minLength: 3},
    user : {type: mongoose.Schema.Types.ObjectId, ref:"User"},
}, { timestamps: true });

module.exports = mongoose.model("Transcript", transcriptSchema);