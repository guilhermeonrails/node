const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/index');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', controller.showIndex);
router.post('/', controller.login);
router.get('/signup', controller.showPageSignUp);
router.post('/signup', controller.signUp);
router.get('/members', controller.showMembersPage);
router.get('/admin', controller.admin);
router.use(controller.get404Page);

module.exports = router;
