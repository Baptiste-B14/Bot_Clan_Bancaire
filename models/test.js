import { Sequelize } from 'sequelize'
import { db } from '../database/db.js'

export const Model = db.define(
    'test',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        },

        name: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
    }
);

//Model.sync({force: true})