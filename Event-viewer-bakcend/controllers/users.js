const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User } = require('../models')

router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

router.post('/', async (req, res) => {
    const { username, password } = req.body

    if (!password || password.length < 3) {
        return res.status(400).json({ error: 'password must be at least 3 characters long' })
    }

    try {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = await User.create({ username, passwordHash })
        res.status(201).json({ id: user.id, username: user.username })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router