const router = require('express').Router();
const blogRoutes = require('./blog-routes');
const userRoutes = require('./user-routes');
const dashboardRoutes = require('./dashboard-routes');


//use all the routes

router.use('/', dashboardRoutes);

router.use('/', blogRoutes);

router.use('/', userRoutes);

module.exports = router;