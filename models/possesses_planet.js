import { Sequelize } from 'sequelize'
import { db } from '../database/db.js'

export const Model = db.define(
	'possesses_planet',
	{
		character_id: {
			type: DataTypes.INTEGER,
		},
		planet_id: {
			type: DataTypes.INTEGER,
		},
	},
	{
		timestamps: false
	},
);