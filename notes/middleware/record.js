const Note = require('../models/Note')
const formidable = require('formidable')

exports.add = (req, res) => {
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields) => {
        if (err) return next(err)
        if (!fields.record) {
          res.message('Empty record')
          return res.redirect('back')
        }
        let note = new Note({ userid: req.session.uid, record: fields.record })
        note.save((err) => {
            if (err) {
                res.error('DB error')
                return res.redirect('back')
            }
            res.redirect('/main')
        })
    })
}

exports.delete = (req, res, next) => {
    Note.getById(req.params.noteId, (err, note) => {
        if (err) return next(err)
        if (!note) return res.redirect('back')
        if (note.userid != req.user.uid) return res.redirect('back')
        Note.deleteRecord(req.params.noteId, (err) => {
            if (err) {
                res.error('Delete note operation error')
            }
            res.redirect('back')
        })
    })
}