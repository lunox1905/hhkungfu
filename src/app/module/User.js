const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    username: {type: String, unique: true},
    password: {type: String},
    role: {type: String, default: "admin"}
}, {
    timestamps: true
});
  
  
module.exports = mongoose.model('users' , User)
