const router = require('express').Router();
const Dashboard = require('../models/Dashboard');

router.get('/', async (req, res) => {
    res.render('home', { Dashboard });
});

module.exports = router;

