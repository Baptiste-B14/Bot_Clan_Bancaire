const {SlashCommandBuilder} = require("@discordjs/builders");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-planet')
        .setDescription('Buy a planet')
        .addStringOption(option =>
            option.setName('planet')
                .setDescription('The planet you want to buy')
                .setRequired(true)
        ),
}