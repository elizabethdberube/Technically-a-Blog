const router = require('express').Router();
const Blog = require('../models/Blog');

// get blog route
router.get('/', async (req, res) => {
    const postData = await Blog.findAll().catch((err) => {
        res.json(err);
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('home', { posts });
});


module.exports = router;



