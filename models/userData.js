const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('user', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        },
        discordId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        pseudo: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        money: {
            type: Sequelize.INTEGER,
            allowNull: true,
            unique: false
        },
        moneyUsed: {
            type: Sequelize.INTEGER,
            allowNull: true,
            unique: false
        },


});

module.exports = User;


