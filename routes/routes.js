const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const controller = require('../controllers/index')
const session = require('express-session')
const sessionStore = require('../util/sessionStorage')
const passport = require('passport')

router.use(bodyParser.urlencoded({ extended: true }))

router.use(session({
    secret: 'abc123',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}))

router.use(passport.initialize())
router.use(passport.session())
require('../passaport-config')

router.get('/', controller.showIndex)
router.post('/',
    passport.authenticate('local', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/members')
    }) 
router.get('/signup', controller.showPageSignUp)
router.post('/signup', controller.signUp)
router.get('/members', controller.checkAuth, controller.showMembersPage)
router.get('/logout', controller.logout)
router.get('/admin', controller.admin)
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/members')
    })
router.use(controller.get404Page)

module.exports = router
