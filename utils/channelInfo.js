import fetch from 'node-fetch';
import 'dotenv/config';

export async function getChannelInfo(channelId) {
    const url = `https://discord.com/api/v10/channels/${channelId}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const channel = await response.json();
        return channel;
        //console.log(`Le nom du salon est : ${channel.name}`);
    } catch (error) {
        console.error(`Erreur lors de la récupération du salon: ${error.message}`);
    }
}

