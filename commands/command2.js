// IMPORTS  
import {
    InteractionResponseType,
  } from 'discord-interactions';
//Command def

export const COMMAND_DEF = {
    name: 'command2',
    description: 'Je suis la commande 2',
    type: 1,
    contexts: [0]
}

export function doSomething(res) {
    return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: 'Je suis la réponse à la commande 2',
        },
      });
}