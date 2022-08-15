const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
    title: String,
    content: String,
    username: String,
    datePosted:{ /* 'default' object instance */
        type: Date,
        default: new Date()
    }
})

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = BlogPost;