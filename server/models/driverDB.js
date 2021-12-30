const mongoose = require('mongoose');
const Schmea = mongoose.Schema;

var driverSchema = new Schmea({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    arac: {
        type: String,
    },
    il:{
        type: String,
    },

    arac_plaka: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now

    },
    last_update: {
        type: Date,
        default: Date.now
    },
    token: {
        type: String
    }
})

var driver = mongoose.model('driver', driverSchema);
module.exports = driver;