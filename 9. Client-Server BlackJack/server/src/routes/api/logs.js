const express = require('express');
const contrs = require('../../controllers/logs');
const auth = require('../../middlewares/auth');
const router = express.Router();

router.post('/log', auth, contrs.log);

router.get('/about/:id', contrs.about);

module.exports = router;
