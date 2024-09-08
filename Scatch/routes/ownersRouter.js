const express = require('express')
const router = express.Router()
const ownerModel = require('../models/ownersModel')

if (process.env.NODE_ENV === "development") {
    router.get('/create', async (req, res) => {
        let owners = await ownerModel.findOne()
        if (owners.length > 0) return res.send('YOU dont aloowed')
        let { fullName, email, profilePic } = req.body
        let createdOwner = await ownerModel.create({
            fullName,
            email,
            profilePic,
        })
        res.send(createdOwner)
    })
}

router.get('/', (req, res) => {
    res.send('hiii')
})

module.exports = router