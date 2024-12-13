const mongoose = require('mongoose')

const list =  new mongoose.Schema({

    user_id: {
        type: String,
        required: true
    },

    title: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('List',list)