import { Sequelize } from 'sequelize'
import { db } from '../database/db.js'

export const Model = db.define(
	'participates_in_a_space_conflict',
	{
		conflict_id: {
			type: DataTypes.INTEGER,
		},
		fleet_id: {
			type: DataTypes.INTEGER,
		},
	},
	{
		timestamps: false,
	},
);