const express = require('express')
const path = require("path")
const app = express()
const userModel = require('./models/user')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})
app.post('/register', async (req, res) => {
    let { name, userName, email, age, password } = req.body
    let user = await userModel.findOne({ email })
    if (user) return res.status(500).send('User ALready Registerd')
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                userName,
                email,
                name,
                age,
                password: hash,
            })
            let token = jwt.sign({ email, userId: user._id }, 'shhhhhhh')
            res.cookie('token', token)
            res.send('Registerd ')
        })
    })
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/logout', (req, res) => {
    res.cookie('token', '')
    res.redirect('/login')
})

app.post('/login', async (req, res) => {
    let { email, password } = req.body
    let user = await userModel.findOne({ email })
    if (!user) return res.status(500).send('Something went wrong')

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) return res.status(200).send('Your are logedin')
        else { res.redirect('/login') }
    })
})

app.listen(3000)