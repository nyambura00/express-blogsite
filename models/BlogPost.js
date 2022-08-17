const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');

const blogPostSchema = new Schema({
    title: String,
    content: String,
    username: String,
    datePosted:{ /* 'default' object instance */
        type: Date,
        default: new Date()
    },
    image: String,
})

blogPostSchema.plugin(uniqueValidator); // checking for duplicate data entries

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = BlogPost;