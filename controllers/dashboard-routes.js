const router = require('express').Router();
const { registerDecorator } = require('handlebars');
const userAuth = require('../utils/auth');
const { Blog, User } = require('../models');


// get dashboard route
router.get('/dashboard', userAuth, async (req, res) => {

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

router.get('/dashboard/:id', userAuth, async (req, res) => {
    try {
        console.log(req);
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        console.log(blogData);
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('dashboard', {
            ...blogs,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// router.put('/:id', (req, res) => {
//     Blog.update({
//         comment: req.params.comment,


//     })
// })

















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
