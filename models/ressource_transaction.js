import { Sequelize } from 'sequelize'
import { db } from '../database/db.js'
import { DataTypes } from 'sequelize';

export const Model = db.define(
	'ressource_transaction',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
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