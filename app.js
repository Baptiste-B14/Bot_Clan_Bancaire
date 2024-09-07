import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from 'discord-interactions';

import { joinVoiceChannel, createAudioPlayer, createAudioResource } from '@discordjs/voice';

import {
  Client,
  GatewayIntentBits
}from 'discord.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;

// Initialisation du client Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates, // Nécessaire pour écouter les états vocaux
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // Nécessaire pour lire le contenu des messages
  ],
});

client.once('ready', () => {
  console.log(`Bot connecté en tant que ${client.user.tag}`);
});

// Lancer le bot
client.login(process.env.DISCORD_TOKEN);
/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  // Interaction type and data
  const { type, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    
    const { name } = data;
    console.log(`command triggered ${name}`)

    const {doSomething} = await import('./commands/'+name+'.js');
    try {
      return await doSomething(res);
    } catch (error) {
      console.log(error)
    }

    // console.error(`unknown command: ${name}`);
    // return res.status(400).json({ error: 'unknown command' });
  }

  console.error('unknown interaction type', type);
  return res.status(400).json({ error: 'unknown interaction type' });
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
