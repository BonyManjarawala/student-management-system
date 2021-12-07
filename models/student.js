const mongoose = require("mongoose");
//mongoose.pluralize(null);

const studentSchema = mongoose.Schema({
    id: Number,
    name: String,
    age: Number,
    cource: String
});
const studentModel = mongoose.model("fullstack", studentSchema,"fullstack");

module.exports = studentModel;