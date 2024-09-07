import { Sequelize } from 'sequelize';
import { sequelize } from "../database/db.js";

export const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    discordId: {
        type: Sequelize.STRING,
        allowNull: true,
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