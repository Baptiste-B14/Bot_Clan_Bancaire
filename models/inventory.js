
const Sequelize = require('sequelize');
const db = require('../database/db');

const User = db.define('user', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    
    userTag: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },

    depenseTotale: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false,
    },





});

module.exports = User;


