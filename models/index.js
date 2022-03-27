const User = require('./User');
const Blog = require('./Blog');

User.hasMany(Blog, {

    foreignKey: 'blog_id'

});

Blog.belongsTo(User, {

    foreignKey: 'blog_id',
    onDelete: 'CASCADE',

});

module.exports = { Blog, User };