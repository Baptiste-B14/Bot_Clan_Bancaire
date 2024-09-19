
const Sequelize = require('sequelize');
const db = require('../database/db');

const AvantageProd = db.define('avantageProd', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },

    value: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false
    },






});

module.exports = AvantageProd;


