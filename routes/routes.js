const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/members', (req, res) => {
    res.render('members')
})

router.get('/admin', (req, res) => {
    res.render('admin')
})

router.use((req, res, next) => {
    res.status(404).render('404');
});

module.exports = router