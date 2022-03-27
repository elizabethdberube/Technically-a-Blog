const router = require('express').Router();
const { registerDecorator } = require('handlebars');
const withAuth = require('../utils/auth');
const { Blog } = require('../models');


// get dashboard route
router.get('/dashboard', async (req, res) => {

    res.render('dashboard')
});

router.post('/dashboard', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            title: req.body.title,
            email: req.body.email,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;
