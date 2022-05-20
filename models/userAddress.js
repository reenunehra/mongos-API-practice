const mongoose = require('mongoose');

const userAdressSchema = new mongoose.Schema({
    
    userID: {
        type: String,
        required: true
    },
    Pincode: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },    
    DateCreated: {
        type: Date,
        default: Date.now
    },
    DateModified: {
        type: Date,
        required: false
    }
})

module.exports = mongoose.model('userAddress', userAdressSchema);