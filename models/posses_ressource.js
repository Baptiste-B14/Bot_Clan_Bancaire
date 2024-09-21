import { Sequelize } from 'sequelize'
import { db } from '../database/db.js'

export const Model = db.define(
	'posses_ressource',
	{
		character_id: {
			type: DataTypes.INTEGER,
		},
		ressource_id: {
			type: DataTypes.INTEGER,
		},
		amount: {
			type: DataTypes.INTEGER,
		},
	},
	{
		timestamps: false
	},
);