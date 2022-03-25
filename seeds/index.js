const seedBlogs = require('./blog-seeds');
const Blog = require('../models/Blog.js');
const sequelize = require('../config/connection');


// seed everything
const seedAll = async () => {

    await sequelize.sync({ force: true });

    await Blog.bulkCreate(seedBlogs);
    console.log('\n----- BLOG SYNCED -----\n');

    process.exit(0);

};



seedAll();

