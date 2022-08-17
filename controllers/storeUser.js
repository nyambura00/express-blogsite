const User = require('../models/User.js');
const path = require('path');

module.exports = (req,res)=>{
    User.create(req.body, (error, user) => {
        if(error){
            const validationError = Object.keys(error.errors).map(key => error.errors[key].message) //handling error
            req.session.validationErrors = validationErrors;
            return res.redirect('/auth/register')
        }
        res.redirect('/');
    })
}
