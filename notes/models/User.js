const sqlite3 = require('../node_modules/sqlite3/sqlite3').verbose();
const dbName = 'later.sqlite';
var db = new sqlite3.Database(dbName);

db.serialize(() => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(25), 
            login VARCHAR(25),
            pass VARCHAR(25)
        )    
    `
    db.run(sql, (err) => {
        if (err) throw err
    })
})
 
class User {
    constructor(obj) {
        for (let prop in obj) {
            this[prop] = obj[prop]
        }
    }

    static getByLogin(login, cb) {
        db.get('SELECT * FROM users WHERE login=?', login, (err, user) => {
            if (err) return cb(err)
            console.log(user)
            cb(null, new User(user))
        })
    }

    static authenticate(login, pass, cb) {
        User.getByLogin(login, (err, user) => {
            if (err) return cb(err)
            if (!user.id) return cb()
            if (user.pass === pass) cb(null, user)
            else {
                return cb()
            }
        })
    }

    register(cb) {
      User.getByLogin(this.login, (err, user) => {
        if (err) return cb(err)
        if (user.id) return cb(new Error(`User ${this.login} is already exists`))
        db.run('INSERT INTO users (name, login, pass) VALUES (?, ?, ?)', this.name, this.login, this.pass, cb)
      })
    }
}

module.exports = User