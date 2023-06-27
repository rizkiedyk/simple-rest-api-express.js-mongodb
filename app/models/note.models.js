const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const NoteSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    // agar secara otomatis membuat created_at dan updated_at
    timeStamps: true
})


module.exports = mongoose.model('Note', NoteSchema)