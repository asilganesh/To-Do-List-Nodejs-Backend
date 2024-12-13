const mongoose = require('mongoose')

const user_details = new mongoose.Schema({

    name : {
        type: String,
        required: true
    },

    mail: {
        type:String,
        required:true
    },

    password: {
        type: String,
        required:true
    }

})

module.exports = mongoose.model('User',user_details)