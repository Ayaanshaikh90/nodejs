const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    profilePic: String,
    products: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("owner", ownerSchema)