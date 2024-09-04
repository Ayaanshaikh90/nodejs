const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/project1")

const userSchema = mongoose.Schema({
    userName: String,
    name: String,
    email: String,
    age: Number,
    password: String,
})

module.exports = mongoose.model('user', userSchema)