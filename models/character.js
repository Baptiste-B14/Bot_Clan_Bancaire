import { DataTypes, Sequelize } from 'sequelize'
import { db } from '../database/db.js'

export const Model = db.define(
	'character',
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
		character_class: {
			type: DataTypes.INTEGER,
		},
		force: {
			type: DataTypes.INTEGER,
		},
		dexterity: {
			type: DataTypes.INTEGER,
		},
		constitution: {
			type: DataTypes.INTEGER,
		},
		intelligence: {
			type: DataTypes.INTEGER,
		},
		wisdom: {
			type: DataTypes.INTEGER,
		},
		charisma: {
			type: DataTypes.INTEGER,
		},
		speed: {
			type: DataTypes.INTEGER,
		},
		initiative: {
			type: DataTypes.INTEGER,
		},
		reputation: {
			type: DataTypes.INTEGER,
		},
		defense: {
			type: DataTypes.INTEGER,
		},
		defense_score: {
			type: DataTypes.INTEGER,
		},
		defense_class: {
			type: DataTypes.INTEGER,
		},
		defense_attribute: {
			type: DataTypes.INTEGER,
		},
		defense_other: {
			type: DataTypes.INTEGER,
		},
		life_points: {
			type: DataTypes.INTEGER,
		},
		fatigue_points: {
			type: DataTypes.INTEGER,
		},
	},
	{
        timestamps: false,
    }
);