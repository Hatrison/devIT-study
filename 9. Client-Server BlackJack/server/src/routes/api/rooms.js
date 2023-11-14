const express = require('express');
const contrs = require('../../controllers/rooms');
const auth = require('../../middlewares/auth');
const router = express.Router();

router.post('/create-room', contrs.createRoom);

router.post('/join-room', auth, contrs.joinRoom);

module.exports = router;
