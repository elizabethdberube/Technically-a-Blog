const User = require('./User');
const Blog = require('./Blog');


Blog.hasOne(User, {

    foreignKey: 'blog_id',
    onDelete: 'CASCADE',

});

User.hasOne(Blog, {

    foreignKey: 'blog_id'

});

module.exports = { Blog, User };