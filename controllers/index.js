const User = require('../models/user')
const OauthUser = require('../models/oauthUser')
const passport = require('../passaport-config');

exports.showIndex = (req, res, next) => {
    res.render('index')
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await User.findUserBy(email, password);
        if (user) {
            req.session.user = user; // Armazena o usuário na sessão
            res.redirect('/members');
        } else {
            res.render('index', { error: 'Email ou senha incorretos. Tente novamente!' });
        }
    } catch (error) {
        console.error(error);
        res.render('index', { error: 'Não foi possível realizar o login' });
    }
}

exports.showPageSignUp = (req, res, next) => {
    res.render('signUp')
}

exports.signUp = async(req, res, next) => {
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password
    const emailDisponivel = await User.findUserBy(email, password);
    console.log(emailDisponivel);
    if (emailDisponivel) {
        res.render('signUp', { error: 'O e-mail indisponível.' }); // Se o e-mail já existir, renderiza a página de cadastro com uma mensagem de erro
    } else {
        const user = new User(name, email, password)
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
    // console.log(req.session.user);
    res.render('members')
}

exports.admin = (req, res) => {
    res.render('admin')
}

exports.get404Page = (req, res, next) => {
    res.status(404).render('404')
}

exports.checkAuth = (req, res, next) => {
    // console.log(req.session.user);
    if (req.session && req.session.user) {
        return next()
    } else {
        res.redirect('/')
    }
}

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
    })
}

exports.githubAuth = passport.authenticate('github')


exports.githubAuthCallback = passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/members');
};