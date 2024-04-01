const User = require('../models/user')

exports.showIndex = (req, res, next) => {
    res.render('index')
}

exports.login = async (req, res, next) => {
    const {email, password} = req.body
    try {
        const user = await User.findUserBy(email, password);
        if (user) {
            res.redirect('/members');
        } else {
            res.render('index');
        }
    } catch (error) {
        console.error(error);
        res.render('index');
    }
}

exports.showPageSignUp = (req, res, next) => {
    res.render('signUp')
}

exports.signUp = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    const user = new User(name, email, password)
    user.save()
        .then(result => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
            res.redirect('signup')
        })
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
