const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Event extends Model { }

Event.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' }
}
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'event',
    tableName: 'events'
})

module.exports = Event