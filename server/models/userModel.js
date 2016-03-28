
// JavaScript source code
var crypto = require('crypto');
var mongoose = require('mongoose');

//schema hoe game data verwerkt moet worden in mongo
var userSchema = new mongoose.Schema({
    username: { type: String, default: "" },
    password: { type: String, default: "" },
    games: []

});

//model van bovenstaand schema
module.exports = mongoose.model('User', userSchema);