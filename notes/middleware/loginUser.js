const User = require('../models/User')

module.exports = (req, res, next) => {
    let data = {
        login: req.body.login,
        pass: req.body.pass
    }

    User.authenticate(data.login, data.pass, (err, user) => {
        if (err) return next(err)
        if (!user) {
            res.error('Authentication failed')
            return res.redirect('/login')
        } else {
            req.session.ulogin = user.login
            req.session.uid = user.id
            res.locals.user = user
            res.redirect('/main')
        }
    })
}