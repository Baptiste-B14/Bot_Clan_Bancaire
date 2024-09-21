import { Sequelize } from 'sequelize'
import { db } from '../database/db.js'

export const Model = db.define(
	'space_fleet',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true,
		},
		owner_id: {
			type: DataTypes.INTEGER,
		},
		name: {
			type: DataTypes.STRING,
		},
		status: {
			type: DataTypes.BOOLEAN,
		},
	},
	{
		timestamps: {
		},
	},
);