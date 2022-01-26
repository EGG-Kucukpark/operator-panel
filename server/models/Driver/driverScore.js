const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverScore = new Schema({
    driver_id: {
        type: Schema.Types.ObjectId,
       
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: Number,
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now
    },
    last_update: {
        type: Date,
        default: Date.now
    }
})


module.exports =  mongoose.model('driverScore', driverScore);;
