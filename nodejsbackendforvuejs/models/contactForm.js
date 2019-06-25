const mongoose = require('mongoose');

let ContactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},
    {
        timestamp: true
    }
);

let ContactForm = mongoose.model('Message', ContactSchema);
module.exports = ContactForm;
