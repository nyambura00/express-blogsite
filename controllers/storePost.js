const BlogPost = require('../models/BlogPost.js')
const path = require('path')

module.exports = (req,res)=>{
let image = req.files.image;
    image.mv(path.resolve(__dirname,'..','public/img',image.name),async (error)=>{
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name,
            userid: req.session.userId // incorporate relation between User and Blogpost
        })
        if(error){
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message) //handling error
            req.flash('validationErrors',validationErrors)
            req.flash('data',req.body) // persisting request form data
            return res.redirect('/posts/new')
        }
        res.redirect('/')
    })
}