const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const thoughtRoutes = require('./thought-routes');

router.use('/thought', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;