const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: '',
    },
    
    phone: {
        type: String,
        required: true,
    },
    disabled:{
        type: Boolean,
        default: false,
        
    },
 
    created_at: {
        type: Date,
        default: Date.now()
    }
});


const User = mongoose.model('customers', userSchema);

module.exports = User;