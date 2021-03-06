const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: false
    },
    Datecreated: {
        type: Date,
        default: Date.now
    },
    DateModified: {
        type: Date,
        required: false
    }
})

module.exports = mongoose.model('user', userSchema);