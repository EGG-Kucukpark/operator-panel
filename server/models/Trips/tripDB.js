const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tripSchema = new Schema({
    driverPhone: {
        type: String,
        required: true

    }, 
    customerPhone: {
        type: String,
        required: true
    },

    distance:{
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});


module.exports = mongoose.model('trip', tripSchema);
