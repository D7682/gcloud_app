const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema({
    username: String,
    age: Number
})

module.exports = User = mongoose.model("user", Users);