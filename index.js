const express = require('express');
const app = express();
const dotenv = require('dotenv');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const BlogPost = require('./models/BlogPost');

const PORT = process.env.PORT || 3000;

//setup dotenv
dotenv.config();

app.use(express.static('/public'));
app.set('view engine', ejs);
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', { blogposts });
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post', (req, res) => {
    res.render('post');
})

app.get('/posts/new', (req,res)=>{
    res.render('createpost');
})

app.post('/post/store', async (req,res)=>{
    await BlogPost.create(req.body)
        res.redirect('/');
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})