const express = require('express')
const path = require("path")
const app = express()
const userModel = require('./models/user')
const postModel = require('./models/post')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const post = require('./models/post')
const upload = require('./config/multer')

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

app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate('posts')
    res.render('profile', { user })
})

app.post('/profile', isLoggedIn, async (req, res) => {
    let { postData } = req.body
    let user = await userModel.findOne({ email: req.user.email })
    let post = await postModel.create({
        user: user._id,
        content: postData,
    })
    user.posts.push(post._id)
    await user.save()
    res.redirect('/profile')
    console.log(req.body);
    console.log(post._id);
})

app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate('user')
    if (post.likes.indexOf(req.user._id) === -1) {
        post.likes.push(req.user._id)
    } else {
        post.likes.slice(post.likes.indexOf(req.user.id), 1)
    }
    await post.save()
    res.redirect('/profile')
})
s
app.get('/profile/upload', (req, res) => {
    res.render('profileupload')
})
app.post('/upload', isLoggedIn, upload.single("image"), async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email })
    user.profilePic = req.file.filename
    await user.save()
    res.redirect('/profile')
})

app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate('user')

    res.render('edit', { post })
})
app.post('/update/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.postData }).populate('user')

    res.redirect('/profile')
})

app.get('/all', async (req, res) => {
    let all = await userModel.find();
    res.send(all)
})

app.get('/logout', (req, res) => {
    res.cookie('token', '')
    res.redirect('/login')
})

app.post('/login', async (req, res) => {
    let { email, password } = req.body
    let user = await userModel.findOne({ email })
    if (!user) return res.status(500).send('Something went wrong')
    let token = jwt.sign({ email, userId: user._id }, 'shhhhhhh')
    res.cookie('token', token)
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) return res.status(200).redirect('/profile')
        else { res.redirect('/login') }
    })
})

function isLoggedIn(req, res, next) {
    if (req.cookies.token === "") {
        res.send("You need to login")
    } else {
        let data = jwt.verify(req.cookies.token, 'shhhhhhh')
        req.user = data
        next()
    }
}

app.listen(3000)
