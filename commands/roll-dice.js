import { InteractionResponseType } from "discord-interactions";

export const COMMAND_DEF = {
    name: 'roll-dice',
    description: 'Roll a 6-sided dice 2024 times and display the results',
    type: 1,
};

export async function doSomething(res) {
    try {
        // Initialisation des statistiques
        const rolls = [];
        const counts = [0, 0, 0, 0, 0, 0];

        // Lancer les dés 2024 fois
        for (let i = 0; i < 2024; i++) {
            const roll = Math.floor(Math.random() * 6) + 1;
            rolls.push(roll);
            counts[roll - 1] += 1;
        }

        // Calculer la moyenne
        const total = rolls.reduce((sum, roll) => sum + roll, 0);
        const average = (total / rolls.length).toFixed(2);

        // Préparer les jets pour l'affichage en une seule ligne
        const allRolls = rolls.slice(0, 1360).join(", ");


        // Créer l'embed
        const embed = {
            title: 'Dice Roll Results',
            color: 0x0099ff,
            description: `All Rolls:\n${allRolls}`,
            fields: [
                { name: 'Average Roll', value: average, inline: false },
                { name: 'Total Rolls', value: rolls.length.toString(), inline: false },
                { name: 'Face 1', value: counts[0].toString(), inline: true },
                { name: 'Face 2', value: counts[1].toString(), inline: true },
                { name: 'Face 3', value: counts[2].toString(), inline: true },
                { name: 'Face 4', value: counts[3].toString(), inline: true },
                { name: 'Face 5', value: counts[4].toString(), inline: true },
                { name: 'Face 6', value: counts[5].toString(), inline: true },
            ],
            timestamp: new Date().toISOString(),
            
        };

        // Répondre à l'utilisateur
        res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [embed],
            },
        });
    } catch (error) {
        console.error(error);
        res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: 'An error occurred while rolling the dice. Please try again later.',
            },
        });
    }
}
