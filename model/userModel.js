const mongoose = require('mongoose')


const userShema = mongoose.Schema({
    username:{
        type:String,
        required:[true , 'Please enter the user name']
    },
    email:{
        type:String,
        required:[true , 'Please enter the email']
    },
    password:{
        type:String,
        required:[true , 'Please enter the password']
    }
},{
    timestamps:true
})

module.exports = mongoose.model('User', userShema )

