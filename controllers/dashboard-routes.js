const router = require('express').Router();
const { registerDecorator } = require('handlebars');


// get dashboard route
router.get('/dashboard', async (req, res) => {

    res.render('dashboard')
});


module.exports = router;
