var express = require('express');
var router = express.Router();
const pug = require('pug');
const checkAuth = require('../middleware/chekAuth')
const getMainTemplate = require('../middleware/getTemplate');
const Note = require('../models/Note')

router.get('/', checkAuth, getMainTemplate('main'), (req, res, next) => {
    if (!req.user.uid) {
        res.error('LogIn before please')
        return res.redirect('/login')
    }
    Note.getUserRecords(req.user.uid, (err, notes) => {
        if (err) return next(err)
        let render = pug.compile(req.template);
        let html = render( { notes, user: req.user } );
        res.send(html);
    })
});

module.exports = router;
