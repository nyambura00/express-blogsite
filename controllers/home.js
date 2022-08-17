const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) =>{
    const blogposts = await BlogPost.find({}).populate('userid');// specified document with the user-id in the collection
    console.log(req.session);
    res.render('index',{
        blogposts
    });
}
