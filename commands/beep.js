const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('beep')
	.setDescription('Beep!'),
	async execute(interaction) {
		return interaction.reply("Lucas, t'es un gros lardon");
	},
};
