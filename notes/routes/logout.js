var express = require('express');
var router = express.Router();
const pug = require('pug');
const checkAuth = require('../middleware/chekAuth')
const getTemplate = require('../middleware/getTemplate');

router.get('/', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err
        res.redirect('/login')
    })
})

module.exports = router;
