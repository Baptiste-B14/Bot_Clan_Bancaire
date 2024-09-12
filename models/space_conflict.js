import { Sequelize } from 'sequelize'
import { db } from '../database/db.js'

export const Model = db.define(
	'conflict',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true,
		},
		winner: {
			type: DataTypes.INTEGER,
		},
		is_finished: {
			type: DataTypes.BOOLEAN,
		},
	},
	{
		timestamps: false,
	},
);