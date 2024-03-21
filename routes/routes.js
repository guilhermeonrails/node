const express = require('express')
const controller = require('../controllers/index')
const errorController = require('../controllers/error')
const router = express.Router()

router.get('/', controller.getHomePage)
router.get('/signup', controller.signUp)
router.get('/members', controller.showMembersPage)
router.get('/admin', controller.admin)
router.use(errorController.get404Page);

module.exports = router