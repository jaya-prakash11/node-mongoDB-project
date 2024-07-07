const mongoose = require('mongoose')


const contactModel = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
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