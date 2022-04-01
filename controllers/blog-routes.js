const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const userAuth = require('../utils/auth');

// get blog route
router.get('/', async (req, res) => {
    const postData = await Blog.findAll({
        include: [
            {
                model: User,
                attributes: ['name'],
            },
            {
                model: Comment,
                attributes: ['comments'],
                include: [
                    {
                        model: User,
                        attributes: ['name'],
                    }
                ]
            },
        ],
    });


    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', { posts, logged_in: req.session.loggedIn });
});

// get add a comment route
router.get('/comment/:blog_id', userAuth, async (req, res) => {

    res.render('comment', { blog_id: req.params.blog_id });
});

// create comment
router.post('/comment/:blog_id', userAuth, async (req, res) => {
    try {

        const newBlog = await Comment.create({
            ...req.body,
            comments: req.body.comments,
            user_id: req.session.user_id,
            blog_id: req.params.blog_id


        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});


// sends user to homepage if they are logged in or login page if not
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});



module.exports = router;



