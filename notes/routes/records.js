var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/chekAuth');
const record = require('../middleware/record');

router.get('/add', checkAuth, (req, res, next) => {
    res.render('add', { title: 'Add note'});
});

router.post('/add', checkAuth, record.add)
router.delete('/delete/:noteId', checkAuth, record.delete)

module.exports = router;
