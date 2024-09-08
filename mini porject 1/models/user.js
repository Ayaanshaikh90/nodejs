const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/project1")

const userSchema = mongoose.Schema({
    userName: String,
    name: String,
    email: String,
    age: Number,
    password: String,
    profilePic: {
        type: String,
        default: 'default.jpeg'
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }]  // Add this line if not present

})

module.exports = mongoose.model('user', userSchema)