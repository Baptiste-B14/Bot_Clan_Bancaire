const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const {Sequelize} = require('sequelize');
const User = require("../models/userData");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('profil')
        .setDescription('Print the informations of the player')
        .addStringOption(option =>
            option.setName('player')
                .setDescription('The player you want to know more about')
                .setRequired(false)

        ),

    async execute(interaction) {
        const player = interaction.options.getString('player') ?? interaction.user.id;
        console.log(interaction.options.getString('player'));
        const users = await User.findOne({
            where: { discordId: player },
            //attributes: ['pseudo', 'money']
        });


        const { pseudo, money } = users.dataValues;




        //console.log(users);
        //console.log(users.dataValues('pseudo'));
        // Transformez les résultats pour obtenir uniquement les dataValues
       //const infos = users.map(user => user.dataValues);


        //console.log(infos);


        const embed = new MessageEmbed()
            .setTitle(`${pseudo} profile`)
            .setDescription(`Argent : ${money}\nPlanètes : `)

            .setColor('#0146b1');

        return interaction.reply({ embeds: [embed] });


    },
};


