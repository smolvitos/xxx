const User = require('../models/User')

module.exports = (req, res, next) => {
    if (!req.session.ulogin) return next()
    User.getByLogin(req.session.ulogin, (err, user) => {
        if (err) return next(err)
        //console.log(`${user.name} ${user.login}`)
        req.user = res.locals.user = { uid: user.id, login: user.login, name: user.name }
        console.log(req.user)
        next()
    })
}