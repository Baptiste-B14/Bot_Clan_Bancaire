import { Sequelize } from 'sequelize'
import { db } from '../database/db.js'

export const Model = db.define(
	'production_advantage',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true,
		},
		ressource_id: {
			type: DataTypes.INTEGER,
		},
		production_amount: {
			type: DataTypes.INTEGER,
		},
	},
	{
		timestamps: false
	},
);