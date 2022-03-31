const router = require('express').Router();
const { Blog, User } = require('../models');
const userAuth = require('../utils/auth');

// get blog route
router.get('/', async (req, res) => {
    const postData = await Blog.findAll({
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
    });
    // .catch((err) => {
    //     res.json(err);
    // });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', { posts, logged_in: req.session.loggedIn });
});

// get add a comment route
router.get('/comment', userAuth, async (req, res) => {

    res.render('comment')
});

// create comment
router.post('/dashboard', userAuth, async (req, res) => {
    try {

        const newBlog = await Blog.create({
            ...req.body,
            comment: req.body.comment,
            user_id: req.session.user_id


        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get add a comment route
router.get('/updateBlog', userAuth, async (req, res) => {

    res.render('updateBlog')
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



