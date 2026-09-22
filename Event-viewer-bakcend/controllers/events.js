const router = require('express').Router()
const { Event } = require('../models')

router.get('/', async (req, res) => {
    const events = await Event.findAll()
    res.json(events)
})

router.get('/:id', async (req, res) => {
    const event = await Event.findByPk(req.params.id)
    if (event) {
        res.json(event)
    } else {
        res.status(404).json({error: 'event not found'})
    }
})

router.post('/', async (req, res) => {
    try {
        const event = await Event.create(req.body)
        res.status(201).json(event)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.delete(':id', async (req, res) => {
    const event = await Event.findByPk(req.params.id)
    if (event) {
        await event.destroy()
        res.status(204).end()
    } else {
        res.status(404).json({error: 'event not found'})
    }
})

module.exports = router