const router = require('express').Router()

//routes to individual files
router.use('/advisors', require('./advisors'));
router.use('/tickets', require('./tickets'));

module.exports = router;