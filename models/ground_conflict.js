import { Sequelize } from 'sequelize'
import { db } from '../database/db.js'
import { DataTypes } from 'sequelize';

export const Model = db.define(
	'ground_conflict',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
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