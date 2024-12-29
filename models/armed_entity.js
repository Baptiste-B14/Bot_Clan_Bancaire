import { Sequelize } from 'sequelize'
import { db } from '../database/db.js'
import { DataTypes } from 'sequelize';

export const Model = db.define(
	'armed_entity',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},	
		name: {
			type: DataTypes.STRING,
		},
		class:{
			type: Sequelize.STRING,
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