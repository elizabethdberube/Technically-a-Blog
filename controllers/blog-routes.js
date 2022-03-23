const router = require('express').Router();
const Blog = require('../models/Blog');

router.get('/', async (req, res) => {
    res.render('home', { Blog });
});

module.exports = router;

