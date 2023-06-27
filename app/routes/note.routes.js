const middlewareAuth = require('../middleware/auth')

module.exports = (app) => {
    const notes = require('../controllers/note.controller.js')
    const auth = require('../controllers/auth.controller.js')

    // Create note baru
    app.post('/notes', middlewareAuth, notes.create)

    // find semua note
    app.get('/notes', middlewareAuth, notes.findAll)

    // Get single note berdasarkan id
    app.get('/notes/:noteId', middlewareAuth, notes.findOne)

    // Update single note berdasar Id
    app.put('/notes/:noteId', middlewareAuth, notes.update)

    // Delete single note berdasarkan id
    app.delete('/notes/:noteId', middlewareAuth, notes.delete)

    app.post('/register', auth.register)
    app.post('/login', auth.login)
}