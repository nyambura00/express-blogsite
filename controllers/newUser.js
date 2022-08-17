module.exports = (req, res) =>{
    var username = ""
    var password = ""
    const data = req.flash('data')[0];
    if(typeof data != "undefined"){
        username = data.username
        password = data.password
    }
    res.render('register', { // render register.ejs
        // errors: req.session.validationErrors //handling validation error
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    }) 
}