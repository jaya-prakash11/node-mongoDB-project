const mongoose = require('mongoose')


const contactModel = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please add contact name']
    },
    email:{
        type:String,
        required:[true, 'Please add the email']
    },
    phone:{
        type:String,
        required:[true, 'Please add the Phonenumber']
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Contact',contactModel )