const router = require('express').Router();
const Blog = require('../models/Blog');

// get blog route
router.get('/', async (req, res) => {
    res.render('home', { Blog });
});

module.exports = router;

