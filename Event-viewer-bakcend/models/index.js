const Event = require('./event')
const Registration = require('./registration')
const User = require('./user')

Event.hasMany(Registration, { foreignKey: 'eventId' })
Registration.belongsTo(Event, { foreignKey: 'eventId' })

User.hasMany(Event, { foreignKey: 'userId', onDelete: 'CASCADE' })
Event.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(Registration, { foreignKey: 'userId', onDelete: 'CASCADE' })
Registration.belongsTo(User, { foreignKey: 'userId' })

module.exports = { Event, Registration, User }