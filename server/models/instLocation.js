const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLocationSchema = new Schema({
    userPhone: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    location: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var instuserLocation = mongoose.model('instuserLocation', userLocationSchema);
module.exports = instuserLocation;