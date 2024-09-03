const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const path = require('path')
const userModel = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.render('index')
})
app.post('/create', (req, res) => {
    let { userName, age, email, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let userCreated = await userModel.create({
                userName, email, age, password: hash,
            })

            let token = jwt.sign({ email }, 'shhhhhhhhh');
            res.cookie('token', token)
            res.send(userCreated)
            console.log('salt', salt);
            console.log('password', password);
            console.log('hash', hash);

        })
    })
})

app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email })
    console.log(user);

    // bcrypt.compare(req.body.password, userModel.password, (err, result) => {

    //     console.log(result);
    // })
})
app.get('/logout', (req, res) => {
    res.cookie('token', '')
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
}) 