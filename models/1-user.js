import { Sequelize } from 'sequelize';
import { db } from "../database/db.js";

export const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    discordId: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pseudo: {
        type: Sequelize.STRING,
        allowNull: false,
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