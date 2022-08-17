const express = require('express');
const app = express();
const dotenv = require('dotenv');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;
if (PORT == null || PORT == "") {
    PORT = 4000;
}

const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');

const validateMiddleWare = require('./middleware/validationMiddleware');
const fileUpload = require('express-fileupload');

const loginController = require('./controllers/login');
const newUserController = require('./controllers/newUser');
const logoutController = require('./controllers/logout');

const loginUserController = require('./controllers/loginUser');
const storeUserController = require('./controllers/storeUser');

const expressSession = require('express-session');

const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

const flash = require('connect-flash');
const { default: mongoose } = require('mongoose');

//setup dotenv
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err){
        throw err;
    }
    console.log('Connected to MongoDB Atlas');
});

app.set('view engine', ejs);

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);

app.use(expressSession({
    secret: 'moon hacker'
}))    

app.use(express.static('/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

app.use('/posts/store', validateMiddleWare)

app.use(flash());

app.get('/', homeController);

app.get('/post/:id', getPostController)

app.get('/posts/new', authMiddleware, newPostController);

app.post('/post/store', authMiddleware, storePostController);

app.use((req, res) => res.render('notfound'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})