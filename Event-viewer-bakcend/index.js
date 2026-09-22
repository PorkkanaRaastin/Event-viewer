require('dotenv').config()
const express = require('express')
const { connectToDatabase } = require('./utils/db')
const { Event, User, Registration } = require('./models')

const app = express()
app.use(express.json())

app.get('/api/events', async (request, response) => {
    const events = await Event.findAll()
    response.json(events)
})

app.get('/api/users', async (request, response) => {
    const users = await User.findAll()
    response.json(users)
})

app.get('/api/registration', async (request, response) => {
    const registration = await Registration.findAll()
    response.json(registration)
})

const PORT = process.env.PORT || 3001

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()