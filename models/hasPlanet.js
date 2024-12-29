import { Sequelize } from 'sequelize';
import { db } from "../database/db.js";
import { User } from './1-user.js';
import { Model as Planet} from "./2-planet.js";


export const HasPlanet = db.define('hasPlanet', {
    discordId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },

    idPlanet: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: Planet,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },

   
},
{
    timestamps: false,
});