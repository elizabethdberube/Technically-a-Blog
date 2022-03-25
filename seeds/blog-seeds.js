const Dashboard = require('../models/Dashboard.js');

const blogData = [

    {
        blogContent: 'Breaking News: Young Man Buys Robot Pigeon, Sells Feet to Afford It'
    },
];

const seedBlogs = () => Dashboard.bulkCreate(blogData);

module.exports = seedBlogs;