const router = require('express').Router();
const auth = require('../controllers/auth');
const authCallback = require('../controllers/authCallback');
const contrsWrapper = require('../helpers/contrsWrapper');

router.get('/', contrsWrapper(auth));
router.get('/auth/callback', contrsWrapper(authCallback));

module.exports = router;
