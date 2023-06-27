module.exports = (app) => {
    const notes = require('../controllers/note.controller.js')

    // Create note baru
    app.post('/notes', notes.create)

    // find semua note
    app.get('/notes', notes.findAll)

    // Get single note berdasarkan id
    app.get('/notes/:noteId', notes.findOne)

    // Update single note berdasar Id
    app.put('/notes/:noteId', notes.update)

    // Delete single note berdasarkan id
    app.delete('/notes/:noteId', notes.delete)
}