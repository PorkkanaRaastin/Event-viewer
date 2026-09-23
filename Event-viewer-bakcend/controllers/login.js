const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({where: {username} })

    const passwordCorrect = user === null
    ?false
    :await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({error: 'Wrong username or password!'})
    }

    res.status(200).json({
        id: user.id,
        username: user.username
    })
})

module.exports = loginRouter