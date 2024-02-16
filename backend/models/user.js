const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String, required: true}, 
    username: {type:String , required: true},
    email: {type: String , required: true},
    password: {type: String, required: true},
    role:{type:String,required:true, default:'customer'},
},{
    timestamps: true
});

mongoose.model("Users",userSchema);

module.exports = mongoose.model('Users');