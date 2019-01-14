var Pusher = require('pusher');
const Vote = require('../modules/vote');

var pusher = new Pusher({
    appId: '690139',
    key: 'ee9c5f7f2c886399363e',
    secret: 'e60a6da1932f24bc7a45',
    cluster: 'ap1',
    encrypted: true
  });

module.exports = {
    getVote: (req, res) => {
        Vote.find().then(votes => {
            res.json({success: true, votes: votes});
        });
    },

    postVote: (req, res) => {
        const newVote = {
            nodejs: req.body.nodejs,
            points: 1
        }
        new Vote(newVote).save().then(vote => {
            pusher.trigger('nodejs-poll', 'nodejs-vote', {
                points: parseInt(vote.points),
                nodejs: vote.nodejs
            });
    
            return res.json({success: true, message: 'Thank you for voting'});
        });
    }
};