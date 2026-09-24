const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User, Event } = require('../models')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        attributes: ['id', 'username', 'isAdmin'],
        include: {
            model: Event,
            attributes: ['id', 'name', 'date', 'location']
        }
    })
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

router.delete('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (user) {
        await user.destroy()
        res.status(204).end()
    } else {
        res.status(404).json({ error: 'user not found' })
    }
})

module.exports = router