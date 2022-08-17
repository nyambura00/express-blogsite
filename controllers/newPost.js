module.exports = (req, res) => {
    var title = ""
    var content = ""
    var image = ""
    const data = req.flash('data')[0];
    if(typeof data != "undefined"){
        title = data.title
        content = data.content
        image = data.image
    }

    if(req.session.userId){
        res.render('createpost', {
            createPost: true,
            errors: req.flash('validationErrors'),
            title: title,
            content: content,
            image: image
        });
    }else{
        res.render('/auth/login')
    }
}   