'use strict';
var router = require('express').Router();
module.exports = router;

// router.use('/members', require('./members'));
router.use('/users', require('./userRoutes'));
router.use('/products', require('./productRoutes'));
router.use('/orders', require('./orderRoutes'));
router.use('/cart', require('./cartRoutes'));

router.get('/github', function(req, res, next) {
    res.redirect('https://github.com/grod220/Pretentious-Print-');
})

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
