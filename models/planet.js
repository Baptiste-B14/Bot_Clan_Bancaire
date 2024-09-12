import { Sequelize } from 'sequelize'
import { db } from '../database/db.js'

export const Model = db.define(
	'planet',
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
		description: {
			type: DataTypes.STRING,
		},
		prod_advantage_id: {
			type: DataTypes.INTEGER,
		},
		reduction_advantage_id: {
			type: DataTypes.INTEGER,
		},
		is_mine_built: {
			type: DataTypes.BOOLEAN,
		},
		mine_cost: {
			type: DataTypes.INTEGER,
		},
		mine_build_time: {
			type: DataTypes.INTEGER,
		},
		mine_weekly_income: {
			type: DataTypes.INTEGER,
		},
		mine_max_amount: {
			type: DataTypes.INTEGER,
		},
		mine_last_collect: {
			type: DataTypes.BIGINT,
		},
	},
	{
        timestamps: false,
    }
);