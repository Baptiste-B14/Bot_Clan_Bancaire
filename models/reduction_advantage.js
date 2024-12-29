import { Sequelize } from 'sequelize'
import { db } from '../database/db.js'
import { DataTypes } from 'sequelize';

export const Model = db.define(
	'reduction_advantage',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		armed_entity_id: {
			type: DataTypes.INTEGER,
		},
		reduction_amount: {
			type: DataTypes.INTEGER,
		},
	},
	{
		timestamps: false
	},
);