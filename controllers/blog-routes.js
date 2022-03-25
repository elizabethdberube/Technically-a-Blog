const router = require('express').Router();
const Blog = require('../models/Blog');

// get blog route
router.get('/', async (req, res) => {
    res.render('home', { blogData });
});

module.exports = router;



// // get all dishes
// router.get('/', async (req, res) => {
//     res.render('all', { dishes });
// });

// // get one dish
// router.get('/dish/:num', async (req, res) => {
//     return res.render('dish', dishes[req.params.num - 1]);
// });
