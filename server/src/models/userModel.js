const mongoose =require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    phone:{type:Number, unique:true},
    email:{type :String ,unique:true},
    resume:String
})


module.exports = mongoose.model('User',userSchema)