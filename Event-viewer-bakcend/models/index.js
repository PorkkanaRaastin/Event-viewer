const Event = require('./event')
const Registration = require('./registration')
const User = require('./user')

Event.hasMany(Registration, { foreignKey: 'eventId' })
Registration.belongsTo(Event, { foreignKey: 'eventId' })

module.exports = { Event, User, Registration }