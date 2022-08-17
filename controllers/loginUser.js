const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) =>{
    const { username, password } = req.body;
    User.findOne({username:username}, (error,user) => {
        if (user){
            bcrypt.compare(password, user.password, (error, same) =>{
            if(same){ // if passwords match
                req.session.userId = user._id // handling sessions
                res.redirect('/')
            }
            else{
                res.redirect('/auth/login')
            }
            })
        }else if(error){
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message); //handling error
            req.flash('validationErrors',validationErrors);
            return res.redirect('/auth/login') 
        }
        else{
            res.redirect('/auth/login')
        }
    })
}