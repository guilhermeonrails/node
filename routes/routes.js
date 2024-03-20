const express = require('express')
const controller = require('../controllers/index')
const router = express.Router()

router.get('/', controller.getHomePage)

router.get('/signup', controller.signUp)

router.get('/members', controller.showMembersPage)

router.get('/admin', controller.admin)

router.use((req, res, next) => {
    res.status(404).render('404');
});

module.exports = router