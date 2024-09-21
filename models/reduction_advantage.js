import { Sequelize } from 'sequelize'
import { db } from '../database/db.js'

export const Model = db.define(
	'reduction_advantage',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
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