import { Sequelize } from 'sequelize'
import { db } from '../database/db.js'

export const Model = db.define(
	'armed_entity',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true,
		},
		life_points: {
			type: DataTypes.INTEGER,
		},
		attack_points: {
			type: DataTypes.INTEGER,
		},
		defense_points: {
			type: DataTypes.INTEGER,
		},
		description: {
			type: DataTypes.STRING,
		},

		//true -> Space
		//false -> Ground
		verticality: {
			type: DataTypes.BOOLEAN,
		},
		price: {
			type: DataTypes.INTEGER,
		}
	},
	{
		timestamps: false,
	},
);