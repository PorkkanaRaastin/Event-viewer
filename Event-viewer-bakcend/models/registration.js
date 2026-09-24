const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Registration extends Model { }

Registration.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id'}
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'events', key: 'id' }
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'registration',
    tableName: 'registrations'
})

module.exports = Registration