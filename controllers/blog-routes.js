const router = require('express').Router();
const { Blog, User } = require('../models');

// get blog route
router.get('/', async (req, res) => {
    const postData = await Blog.findAll({
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
    }).catch((err) => {
        res.json(err);
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', { posts, logged_in: req.session.loggedIn });
});

// sends user to hommpage if they are logged in or login page if not
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;



