const router = require('express').Router()
const { Registration, Event } = require('../models')

router.post('/', async (req, res) => {
    try {
        const event = await Event.findByPk(req.body.eventId)
        if (!event) {
            return res.status(400).json({error: 'event does not exist'})
        }
        const registration = await Registration.create(req.body)
        res.status(201).json(registration)
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
})

router.delete('/:id', async (req, res) => {
    const registration = await Registration.findByPk(req.params.id)
    if (registration) {
        await registration.destroy()
        res.status(204).end()
    } else {
        res.status(404).json({ error: 'registration not found' })
    }
})

module.exports = router