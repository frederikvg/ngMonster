// JavaScript source code

var mongoose = require('mongoose');

//schema hoe game data verwerkt moet worden in mongo
var gameSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    contentStory: { type: String, default: "" },
    contentPlayers: { type: Array, default: [] },
    positions: { type: Array, default: [] }
});

//model van bovenstaand schema
module.exports = mongoose.model('Game', gameSchema);

