const router = require('express').Router()
const { Registration, Event } = require('../models')
const { userExtractor } = require('../utils/middleware')

router.post('/', userExtractor, async (req, res) => {
    try {
        const event = await Event.findByPk(req.body.eventId)
        if (!event) {
            return res.status(400).json({ error: 'event does not exist' })
        }

        const registration = await Registration.create({
            eventId: req.body.eventId,
            userId: req.user.id
        })

        res.status(201).json(registration)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.delete('/:id', userExtractor, async (req, res) => {
    const registration = await Registration.findByPk(req.params.id)

    if (!registration) {
        return res.status(404).json({ error: 'registration not found' })
    }

    if (registration.userId !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({ error: 'only the registration owner or an admin can delete this registration' })
    }

    await registration.destroy()
    res.status(204).end()
})

module.exports = router