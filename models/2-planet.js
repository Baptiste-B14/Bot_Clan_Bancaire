import { Sequelize } from 'sequelize'
import { db } from '../database/db.js'

export const Model = db.define(
	'planet',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: Sequelize.STRING,
		},
		description: {
			type: Sequelize.STRING,
		},
		planet_price: {
			type: Sequelize.INTEGER,
		},
		prod_advantage_id: {
			type: Sequelize.INTEGER,
		},
		reduction_advantage_id: {
			type: Sequelize.INTEGER,
		},
		is_mine_built: {
			type: Sequelize.BOOLEAN,
		},
		mine_cost: {
			type: Sequelize.INTEGER,
		},
		mine_build_time: {
			type: Sequelize.INTEGER,
		},
		mine_weekly_income: {
			type: Sequelize.INTEGER,
		},
		mine_max_amount: {
			type: Sequelize.INTEGER,
		},
		mine_last_collect: {
			type: Sequelize.BIGINT,
		},
	},
	{
        timestamps: false,
    }
);