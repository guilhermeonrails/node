const User = require('../models/user')

exports.showIndex = (req, res, next) => {
    res.render('index')
}

exports.showPageSignUp = (req, res, next) => {
    res.render('signUp')
}

exports.signUp = async(req, res, next) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const emailDisponivel = await User.findOne(username, password);
    if (emailDisponivel) {
        res.render('signUp', { error: 'O e-mail indisponível.' });
    } else {
        const user = new User(username, email, password)
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

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
    })
}