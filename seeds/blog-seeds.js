const Blog = require('../models/Blog.js');
console.log(Blog);
const blogData = [

    {
        blogContent: 'Breaking News: Young Man Buys Robot Pigeon, Sells Feet to Afford It'
    },
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;