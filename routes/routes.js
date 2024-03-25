const express = require('express')
const controller = require('../controllers/index')
const router = express.Router()

router.get('/', controller.getHomePage)
router.get('/signup', controller.showPageSignUp)
router.post('/signup', controller.signUp) 
router.get('/members', controller.showMembersPage)
router.get('/admin', controller.admin)
router.use(controller.get404Page);

module.exports = router