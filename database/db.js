const Sequelize = require('sequelize');
const config = require('./db.json');

const sequelize = new Sequelize(config.DATABASE, config.USER, config.PWD, {
    dialect: 'mysql',
    host: config.HOST,

    logging: false,
});





module.exports = sequelize;