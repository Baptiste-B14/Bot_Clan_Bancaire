const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('multidice')
        .setDescription('Throw several dice at once')
        .addIntegerOption(option =>
            option.setName('faces')
                .setDescription('The amount of faces the dice has: 6, 20')
                .setRequired(false)
                .addChoices([
                    ['6', 6],
                    ['20', 20]
                ])
        )
        .addIntegerOption(option =>
            option.setName('value')
                .setDescription('The number of throws')
                .setRequired(false)
        ),

    async execute(interaction) {
        const faces = interaction.options.getInteger('faces') ?? 6;
        const value = interaction.options.getInteger('value') ?? 1;
        let results = [];

        for (let i = 0; i < value; i++) {
            results.push(Math.floor(Math.random() * faces) + 1);
        }

        const resultString = results.join(', ');

        const embed = new MessageEmbed()
            .setTitle('Dice Roll Results')
            .setDescription(`You rolled ${value} d${faces}:\n${resultString}`)
            .setColor('#0146b1');

        return interaction.reply({ embeds: [embed] });
    },
};
