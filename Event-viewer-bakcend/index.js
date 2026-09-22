require('dotenv').config()
const express = require('express')
const { connectToDatabase } = require('./utils/db')
const eventsRouter = require('./controllers/events')
const registrationsRouter = require('./controllers/registrations')

const app = express()
app.use(express.json())

app.use('/api/events', eventsRouter)
app.use('/api/registrations', registrationsRouter)

const PORT = process.env.PORT || 3001

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()