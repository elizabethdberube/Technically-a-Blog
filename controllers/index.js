const router = require('express').Router();
const blogRoutes = require('./blog-routes');
const userRoutes = require('./user-routes');


router.use('/', blogRoutes);

router.use('/', userRoutes);

module.exports = router;