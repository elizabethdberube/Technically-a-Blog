const router = require('express').Router();
const { registerDecorator } = require('handlebars');
const userAuth = require('../utils/auth');
const { Blog, User } = require('../models');


// get dashboard route
router.get('/dashboard', async (req, res) => {

    res.render('dashboard')
});

// create blog
router.post('/dashboard', userAuth, async (req, res) => {
    try {

        const newBlog = await Blog.create({
            ...req.body,
            title: req.body.title,
            blogContent: req.body.blogContent,
            user_id: req.session.user_id

        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

//get blogs by user

router.get('/dashboard', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('dashboard', {
            blogs,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;
