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
		strength: {
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
		intiution: {
			type: DataTypes.INTEGER,
		},
		charisma: {
			type: DataTypes.INTEGER,
		},
		physic: {
			type: DataTypes.INTEGER,
		},
		reflexes: {
			type: DataTypes.INTEGER,
		},
		mind: {
			type: DataTypes.INTEGER,
		},
		actual_life_points: {
			type: DataTypes.INTEGER,
		},
	},
	{
        timestamps: false,
    }
);

//SPEED =  (strength + dexterity + physic) /3
//Initiative = Intelligence + intuition
//Def = (strength + dex + const)/3
//PV = Const + 10