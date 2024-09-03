const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/authapp')
const userSchema = mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    age: String,
})

module.exports = mongoose.model("user", userSchema)