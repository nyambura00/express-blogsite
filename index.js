const express = require('express');
const app = express();
const dotenv = require('dotenv');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const BlogPost = require('./models/BlogPost');

const PORT = process.env.PORT || 3000;

app.use(express.static('/public'));
app.set('view engine', ejs);
app.use(bodyParser.urlencoded({ extended: true }));

const customMiddleware = (req, res, next) => {
    console.log('Middleware');
    next();
}
app.use(customMiddleware);

//setup dotenv
dotenv.config();

const fileUpload = require('express-fileupload')
app.use(fileUpload());

const validateMiddleWare = (req,res,next)=>{
    if(req.files == null || req.body.title == null || req.body.content == null){
        return res.redirect('/posts/new')
    }
    next()
}
app.use('/posts/store', validateMiddleWare)

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

app.get('/post/:id', async (req, res) => {
    const blogPost = await BlogPost.findById(req.params.id);
    res.render('post', {blogPost});
})

app.get('/posts/new', (req,res)=>{
    res.render('createpost');
})

app.post('/post/store', async (req,res)=>{
    let image = req.files.image;
        image.mv(path.resolve(__dirname,'public/img',image.name),//move the file elsewhere on your server and name
        async (error)=>{
            await BlogPost.create({
                ...req.body,
                image: '/img/' + image.name
            })
            res.redirect('/');
        })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})