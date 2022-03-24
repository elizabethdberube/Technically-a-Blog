const router = require('express').Router();
const { registerDecorator } = require('handlebars');
const User = require('../models/User');

//will need a login page with option to sign up. Sign up page. 
// create a user

router.get('/signup', async (req, res) => {

    res.render('signup')
});

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// sends user to hommpage if they are logged in or login page if not
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!userData) {
            res.status(400).json({ message: 'Please enter correct email and password' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Please enter correct email and password' });
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json({ user: userData, message: 'You are now logged in' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



// logout

router.post('logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
