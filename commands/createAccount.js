const { SlashCommandBuilder } = require('@discordjs/builders');
const UserData = require('../models/userData');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('account')
        .setDescription('Create a new account')
        .addStringOption(option => option.setName('pseudo')
            .setDescription('The pseudonyme of your character')
            .setRequired(true)
        ),


    async execute(interaction) {
        try {

           const user = await UserData.create({
               username: interaction.user.username,
               discordId: '<@' + interaction.user.id + '>',
               pseudo: interaction.options.getString('pseudo'),
               money:  0,
               moneyUsed: 0
           });



            return interaction.reply(`User  ${user.pseudo} created.`);
        }


        catch(error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return interaction.reply('You already posess an account');
            }


            return interaction.reply('Something went wrong with creating an account.');
        }

    },
};
