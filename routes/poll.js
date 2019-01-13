const express = require('express');
const router = express.Router();

const controller = require('../controllers/poll.controller');

router.get('/', controller.getVote);

router.post('/', controller.postVote);

module.exports = router;