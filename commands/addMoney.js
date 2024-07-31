

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const User = require("../models/userData");
const {addMoney} = require("../utils/addMoneyFunction");




module.exports = {
    data: new SlashCommandBuilder()
        .setName('money')
        .setDescription('Give money to a player')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The amount to give to the player')
                .setRequired(true)

        )
        .addStringOption(option =>
            option.setName('player')
                .setDescription('The player to give money')
                .setRequired(true)
        ),


    async execute(interaction) {

        const player = interaction.options.getString('player');
        const amount = Math.abs(interaction.options.getInteger('amount'));
        try {
            const users = await User.findOne({
                where: {discordId: player},
                attributes: ['pseudo', 'money']
            });
            if(users === null) return interaction.reply("Le joueur que vous avez sélectionné n'est pas référencé dans le jeu");
            const { pseudo, money } = users.dataValues;

            try{
                const moneyUpdated = money+ amount;
                addMoney(interaction.options.getString('player'), moneyUpdated)

                const embed = new MessageEmbed()
                    .setTitle(`${pseudo}\'s balance updated.`)
                    .setDescription(`New balance : ${moneyUpdated} ( ancien : ${money} )`)
                    .setColor('#0146b1');

                return interaction.reply({ embeds: [embed] });
            }


            catch(error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    return interaction.reply('TYou already posess an account');
                }

                console.log(error);
                return interaction.reply('Something went wrong with updating.');
            }

        }catch(error){
            console.log(error);
            return interaction.reply(error);
        }


    },
};
