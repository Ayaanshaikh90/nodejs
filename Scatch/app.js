const express = require('express')
const jwt = require('jsonwebtoken')
const path = require('path')
const upload = require('./config/multerconfig')

const app = express()

app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.send('hii ')
})


app.listen(3000)