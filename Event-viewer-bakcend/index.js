require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectToDatabase } = require('./utils/db')
const { tokenExtractor, userExtractor } = require('./utils/middleware')
const eventsRouter = require('./controllers/events')
const usersRouter = require('./controllers/users')
const registrationsRouter = require('./controllers/registrations')
const loginRouter = require('./controllers/login')

const app = express()
app.use(cors())
app.use(express.json())
app.use(tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/events', userExtractor, eventsRouter)
app.use('/api/users', usersRouter)
app.use('/api/registrations', userExtractor, registrationsRouter)

const PORT = process.env.PORT || 3001

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()