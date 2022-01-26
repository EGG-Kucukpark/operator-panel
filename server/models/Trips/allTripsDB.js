const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tripSchema = new Schema({
    trip_id:{
        type: Schema.Types.ObjectId ,
        required: true
    },
    lng:{
        type: Number,
    },
    lat:{
        type: Number,
    },
    distance:{
        type: Number,
    }
  


})


module.exports = mongoose.model('alltrips', tripSchema);