import { Sequelize } from 'sequelize';
import { db } from "../database/db.js";

export const Planet = db.define('planet', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    salon: {
        type: Sequelize.STRING, // Stocke l'ID du channel Discord
        allowNull: false,
        unique: true,
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    idMine: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true
    },
    cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    },
});

