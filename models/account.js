const mongoose = require('mongoose');
var passportlocalmongoose=require("passport-local-mongoose");
const accountSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }  
})


accountSchema.plugin(passportlocalmongoose);
const User = mongoose.model('User', accountSchema);

module.exports = User;