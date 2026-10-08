const router = require('express').Router()
const { Event, User, Registration } = require('../models')
const { userExtractor } = require('../utils/middleware')

router.get('/', userExtractor, async (req, res) => {
    const events = await Event.findAll({
        include: [
            { model: User, attributes: ['id', 'username'] },
            { model: Registration, attributes: ['id', 'userId'] }
        ]
    })
    res.json(events)
})

router.get('/:id', userExtractor, async (req, res) => {
    const event = await Event.findByPk(req.params.id)
    if (event) {
        res.json(event)
    } else {
        res.status(404).json({ error: 'event not found' })
    }
})

router.post('/', userExtractor, async (req, res) => {
    try {
        const event = await Event.create({
            ...req.body,
            userId: req.user.id
        })
        res.status(201).json(event)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.delete('/:id', userExtractor, async (req, res) => {
    const event = await Event.findByPk(req.params.id)

    if (!event) {
        return res.status(404).json({ error: 'event not found' })
    }

    if (event.userId !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({ error: 'only the event creator or an admin can delete this event' })
    }

    await event.destroy()
    res.status(204).end()
})

module.exports = router