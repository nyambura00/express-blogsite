module.exports = (req, res) => {
    if(req.session.userId){
        res.render('createpost');
    }else{
        res.render('/auth/login')
    }
}   