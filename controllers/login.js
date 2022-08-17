module.exports = (req, res) =>{
    res.render('login', // render login.ejs
    {errors: req.flash('validationErrors')}) 
}