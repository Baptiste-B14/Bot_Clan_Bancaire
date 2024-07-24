const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('multidice')
        .setDescription('Throw a several dice at once')
        .addIntegerOption(option =>
            option.setName('faces')
                .setDescription('The amount of faces the dice has : 6, 20')
                .setRequired(false)
                .addChoices(
                    { name: '6', value: '6' },
                    { name: '20', value: '20'},
                ),
        )
        .addIntegerOption(option =>
            option.setName('value')
                .setDescription('The number of throw ')
                .setRequired(false)
        ),


    async execute(interaction) {
        return interaction.reply(multidice());
    },
};
multidice(int)

