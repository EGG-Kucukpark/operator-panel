const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,

    },

    phone: {
        type: String,
        required: true,
    },

    address: {},
    address_text: {
        type: String,
        default: null
    },

    address_type: {
        type: String,
    },

    created_at: {
        type: Date,
        default: Date.now()
    }
});


const userAddress = mongoose.model('userAddress', userSchema);

module.exports = userAddress;