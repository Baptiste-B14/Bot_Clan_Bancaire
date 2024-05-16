module.exports = {
	name: 'interactionCreate',
	execute(interaction, client) {
        const command = interaction.client.commands.get(interaction.commandName)
        if (!command) return;
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered the '${interaction.commandName}' command.`)
        try {
            command.execute(interaction, client)
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
        }
	}
}
