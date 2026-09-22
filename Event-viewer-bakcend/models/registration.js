const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Registration extends Model { }

Registration.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
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