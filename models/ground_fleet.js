import { Sequelize } from 'sequelize'
import { db } from '../database/db.js'
import { DataTypes } from 'sequelize';

export const Model = db.define(
	'ground_fleet',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
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
		timestamps: false,
	},
);