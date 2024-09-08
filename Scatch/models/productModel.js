const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    textColor: String,
    panelColor: String,
    bgColor: String,
    name: String,
    price: Number,
    image: String,
    discount: {
        type: String,
        default: 0
    },
})

module.exports = mongoose.model("product", productSchema)