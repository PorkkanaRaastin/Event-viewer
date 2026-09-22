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

module.exports = router