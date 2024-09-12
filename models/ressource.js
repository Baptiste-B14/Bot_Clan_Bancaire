import { Sequelize } from 'sequelize'
import { db } from '../database/db.js'

export const Model = db.define(
	'ressource',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		description : {
			type: DataTypes.STRING,
		},
		consumable: {
			type: DataTypes.BOOLEAN,
		},
		unitary_value: {
			type: DataTypes.INTEGER,
		},
	},
	{
		timestamps: false
	},
);