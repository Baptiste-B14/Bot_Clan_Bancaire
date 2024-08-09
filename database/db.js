import { Sequelize } from "sequelize";
import config from './db.json' assert { type: 'json' };




export const sequelize = new Sequelize(config.DATABASE, config.USER, config.PWD, {
    dialect: 'mysql',
    host: config.HOST,

    logging: false,
});