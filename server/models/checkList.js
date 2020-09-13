const mongoose = require('mongoose')

const checkListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    itemList: [
         {
            name: {
            type: String,
            },
            checked: {
                type: Boolean,
                default: false
            }
        }
    ],

    tags: [{
        type: String
    }],

    dateCreated: {
        type: Date,
        default: Date
    },
/*
    rating: {
        type: Number,
        default: 1
    },
    user: {
        type: String,
        default: "unknown"
    }
*/
})

module.exports = mongoose.model('checkList', checkListSchema)