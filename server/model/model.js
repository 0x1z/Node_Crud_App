const mongoose = require("mongoose");

var scheme = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: String,
    status: String
})

const Userdb = mongoose.model('userdb', scheme);

module.exports = Userdb;