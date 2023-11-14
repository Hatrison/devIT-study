const express = require('express');
const contrs = require('../../controllers/logs');
const router = express.Router();

router.post('/log', contrs.log);

router.get('/about/:id', contrs.about);

module.exports = router;
