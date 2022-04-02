const router = require('express').Router();
const { registerDecorator } = require('handlebars');
const userAuth = require('../utils/auth');
const { Blog, User } = require('../models');


// get dashboard route
router.get('/dashboard', userAuth, async (req, res) => {

    const blogData = await Blog.findAll({
        where: {

            user_id: req.session.user_id
        },
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', { blogs, logged_in: req.session.loggedIn });
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

// delete blog
router.delete('/dashboard/:id', userAuth, async (req, res) => {
    try {

        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get update blog route
router.get('/updateBlog/:id', userAuth, async (req, res) => {
    const blogData = await Blog.findByPk(req.params.id, {

        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
    });

    if (blogData) {
        const blog = blogData.get({ plain: true });

        res.render('updateBlog', { blog })
    }
});


// update blog by id
router.put('/dashboard/:id', userAuth, async (req, res) => {
    try {

        const blogData = await Blog.update({

            title: req.body.title,
            blogContent: req.body.blogContent,
        },
            {
                where: {
                    id: req.params.id,
                },
            }
        )


        if (!blogData) {
            res.status(404).json({ message: 'Blog can not be empty' });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }

});

// deletes blog by id
router.delete('/:id', userAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blogs available' });
            return;
        }
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// get create a log page
router.get('/blog', userAuth, async (req, res) => {

    res.render('blog')
});


module.exports = router;
