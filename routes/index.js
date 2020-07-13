const router = require('express').Router();

router.use('/restaurant', require('./restaurant'));
router.use('/item', require('./item'));
router.use('/carousel', require('./carousel'));

module.exports = router;
