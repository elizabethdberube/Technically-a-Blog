const seedBlogs = require('./blog-seeds');

const sequelize = require('../config/connection');

// seed everything

const seedAll = async () => {

    await sequelize.sync({ force: true });
    console.log('\n----- BLOG SYNCED -----\n');
    await seedBlogs();
    process.exit(0);

};

seedAll();
