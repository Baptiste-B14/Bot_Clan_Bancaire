const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const User = require("../models/userData");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('buy-planet')
        .setDescription('Buy a planet')
        .addStringOption(option =>
            option.setName('planet')
                .setDescription('The planet you want to buy')
                .setRequired(true)

        ),


    async execute(interaction) {

        const salon = interaction.guild.salon
        //const player = interaction.options.getString('player') ?? interaction.user.username;
        /*const users = await User.findOne({
            where: { username: player },
            attributes: ['pseudo', 'money']
        });
        const { pseudo, money } = users.dataValues;



        

        const embed = new MessageEmbed()
            .setTitle('Dice Roll Results')
            .setDescription(`You rolled ${value} d${faces}:\n${resultString}`)
            .setColor('#0146b1');

        return interaction.reply({ embeds: [embed] });
        */

    },
};
