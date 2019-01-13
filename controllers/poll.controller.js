var Pusher = require('pusher');

var pusher = new Pusher({
    appId: '690139',
    key: 'ee9c5f7f2c886399363e',
    secret: 'e60a6da1932f24bc7a45',
    cluster: 'ap1',
    encrypted: true
  });

module.exports = {
    getVote: (req, res) => {
        res.send('POLL');
    },

    postVote: (req, res) => {
        pusher.trigger('nodejs-poll', 'nodejs-vote', {
            points: 1,
            nodejs: req.body.nodejs
        });

        return res.json({success: true, message: 'Thank you for voting'});
    }
};