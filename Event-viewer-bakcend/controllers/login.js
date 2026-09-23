const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User } = require('../models')

router.post('/', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ where: { username } })

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({ error: 'väärä käyttäjänimi tai salasana' })
    }

    res.status(200).json({
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin
    })
})

module.exports = router