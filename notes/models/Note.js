const sqlite3 = require('sqlite3').verbose();
const dbName = 'later.sqlite';
var db = new sqlite3.Database(dbName);
const sql = `
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userid INTEGER,
            record VARCHAR(200)
        )
    `
db.run(sql, (err) => {
    if (err) throw err
})

class Note {
    constructor(obj) {
        for (let prop in obj) {
            this[prop] = obj[prop]
        }
    }

    static getById(id, cb) {
        db.get(`SELECT * FROM notes WHERE id=${id}`, cb)
    }

    static getUserRecords(uid, cb) {
        db.all(`SELECT * FROM notes WHERE userid=${uid}`, cb)
    }

    static deleteRecord(id, cb) {
        db.run(`DELETE FROM notes WHERE id=?`, id, cb)
    }

    save(cb) {
        db.run(`INSERT INTO notes (userid, record) VALUES (?, ?)`, this.userid, this.record, cb)
    }
}

module.exports = Note