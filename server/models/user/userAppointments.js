const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },

    phone: {
        type: String,
        required: true,
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    address: {},
    address_text: {
        type: String
    },

    created_at: {
        type: Date,
        default: Date.now()
    }
});


const userAppointment = mongoose.model('userappointments', userSchema);

module.exports = userAppointment;