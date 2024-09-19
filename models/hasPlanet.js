import { Sequelize } from 'sequelize';
import { db } from "../database/db.js";
import { User } from './user.js';
import { Planet} from "./planet.js";

export const HasPlanet = db.define('hasPlanet', {
    discordId: {
        type: Sequelize.STRING,
        unique: false,
        primaryKey: true
    },

    idPlanet: {
        type: Sequelize.STRING, // Stocke l'ID du channel Discord
        allowNull: false,
        unique: true,
        primaryKey: true
    },

});

// Clé étrangère discordId -> User.discordId
Planet.belongsTo(User, {
    foreignKey: 'discordId', // Référence le discordId dans la table User
    targetKey: 'discordId',
    onDelete: 'CASCADE'
});

User.belongsTo(Planet, {
    foreignKey: 'idPlanet',
    targetKey: 'salon',
    onDelete: 'CASCADE'
});