const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const Planet = sequelize.define('mine', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },

    production: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
    },

    lastCollect:{
        type:Sequelize.DATE,
        allowNull: true,
        unique: false,
    },
    /*
    avantage: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
    },
    */
    lastCollect:{
        type:Sequelize.DATE,
        allowNull: true,
        unique: false,
    },

    salon:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },





});

module.exports = mine;


