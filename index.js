const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const ejs = require('ejs');

//setup dotenv
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.static('/public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
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

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})