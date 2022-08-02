const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb+srv://admin:admin@MongoDB@cluster0.dcizy.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,});

BlogPost.create({
    title: 'Test Post',
    content: 'This is a test post'
},(error, blogpost) => {
    console.log(error, blogpost); //handling error, and returning newly created post
});

