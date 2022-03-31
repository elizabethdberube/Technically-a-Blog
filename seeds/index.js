const blogData = require('./blog-seeds');
const userData = require('./user-seeds');
const { Blog, User } = require('../models');
const sequelize = require('../config/connection');

// const seedUser = async () => User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
// });

// const seedBlog = async () => Blog.bulkCreate(blogData, ...project,
//     user_id: users[Math.floor(Math.random() * users.length)].id,
//   });

// // seed everything
// const seedAll = async () => {

//     await sequelize.sync({ force: true });

//     await seedUser();

//     await seedBlog();

//     console.log('\n----- BLOG SYNCED -----\n');

//     process.exit(0);

// };
const seedAll = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const blog of blogData) {
        await Blog.create({
            ...blog,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    console.log('\n----- BLOG SYNCED -----\n');

    process.exit(0);
};

seedAll();







