const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    nodejs: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    }
});

const Vote = mongoose.model('Vote', voteSchema, 'votes');

module.exports = Vote;