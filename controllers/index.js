const User = require('../models/user')

exports.showIndex = (req, res, next) => {
    res.render('index')
}

exports.showPageSignUp = (req, res, next) => {
    res.render('signUp')
}

exports.signUp = async(req, res, next) => {
    const { email, username, password } = req.body;
    const user = await User.findOne(email);
    if (user) {
        res.render('signUp', { error: 'O e-mail ou nome de usuário estão indisponíveis.' });
    } else {
        user = new User(username, email, password)
        user.save()
            .then(result => {
                res.redirect('/')
            })
            .catch(err => {
                console.log(err)
                res.redirect('signup')
            }
            )
    }
}

exports.showMembersPage = (req, res) => {
    res.render('members')
}

exports.admin = (req, res) => {
    res.render('admin')
}

exports.get404Page = (req, res, next) => {
    res.status(404).render('404')
}

exports.checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/')
}

exports.logout = async (req, res, next) => {
    req.session.destroy()
    res.redirect('/')
}