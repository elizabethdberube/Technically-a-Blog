const blogData = require('./blog-seeds');
const userData = require('./user-seeds');
const { Blog, User } = require('../models');
const sequelize = require('../config/connection');

const seedUser = async () => User.bulkCreate(userData);

const seedBlog = async () => Blog.bulkCreate(blogData);

// seed everything
const seedAll = async () => {

    await sequelize.sync({ force: true });

    await seedUser();

    await seedBlog();

    console.log('\n----- BLOG SYNCED -----\n');

    process.exit(0);

};

seedAll();


// seed everything
// const seedAll = async () => {

//     await sequelize.sync({ force: true });

//     await Blog.bulkCreate(seedBlogs);
//     console.log('\n----- BLOG SYNCED -----\n');

//     process.exit(0);

// };





