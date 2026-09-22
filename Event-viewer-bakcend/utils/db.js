const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false
})

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('database connected')
    } catch (error) {
        console.log('connecting database failed', error)
        return process.exit(1)
    }
    return null
}

module.exports = { connectToDatabase, sequelize }