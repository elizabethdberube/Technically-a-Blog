const router = require('express').Router();
const { registerDecorator } = require('handlebars');
const User = require('../models/User');


//will need a login page with option to sign up. Sign up page. 
// create a user

//Do I need utils folder?

// get signup route
router.get('/signup', async (req, res) => {

    res.render('signup')
});

// create user
router.post('/signup', async (req, res) => {
    console.log(req.body);

    try {
        const userData = await User.create({

            name: req.body.name,
            password: req.body.password,
        });


        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;


            res.redirect('/login');

        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



router.post('/login', async (req, res) => {
    try {

        let userData = await User.findOne({
            where: {

                name: req.body.name,
            },
        });

        if (!userData) {

            res.status(400).json({ message: 'There was a prolem with your username or password' });

            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {

            res.status(400).json({ message: 'There was a prolem with your username or password' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.status(200).json({ message: 'You are now logged in' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    return;
});



// logout

router.get('/logout', async (req, res) => {

    res.render('logout')
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {

            res.redirect('/');
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
