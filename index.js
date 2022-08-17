const express = require('express');
const app = express();
const dotenv = require('dotenv');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');

const loginController = require('./controllers/login');
const newUserController = require('./controllers/newUser');

const loginUserController = require('./controllers/loginUser');
const storeUserController = require('./controllers/storeUser');

const expressSession = require('express-session');


app.get('/auth/login', loginController);
app.get('/auth/register', newUserController);
app.post('/users/login',loginUserController)
app.post('/users/register', storeUserController);

app.use(express.static('/public'));
app.set('view engine', ejs);
app.use(bodyParser.urlencoded({ extended: true }));

//setup dotenv
dotenv.config();

const fileUpload = require('express-fileupload')
app.use(fileUpload());

const validateMiddleWare = require('./middleware/validationMiddleware');
app.use('/posts/store', validateMiddleWare)

app.get('/', homeController);

app.get('/post/:id', getPostController)

app.get('/posts/new', newPostController);

app.post('/post/store', storePostController)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})