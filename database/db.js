import {Sequelize} from 'sequelize'
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
// Obtenir le chemin actuel du fichier
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin vers le fichier .env en dehors de la racine du projet
const envPath = path.resolve(__dirname, '../.env');

// Charger le fichier .env
dotenv.config({ path: envPath });

/*
export const db = new Sequelize("database_clan_bancaire_dev_baptiste", "root", "mdp", {
    dialect: "mysql",
    host: "localhost",

    logging: false,
});*/

export const db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PWD, {
    dialect: process.env.DIALECT,
    host: process.env.HOST,

    logging: false,
});