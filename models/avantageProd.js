
const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const AvantageProd = sequelize.define('avantageProd', {

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },

    id_ressource: {

    },

    amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false
    },





});

module.exports = AvantageProd;


