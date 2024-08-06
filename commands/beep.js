import {
  InteractionResponseType,
} from 'discord-interactions';

export const COMMAND_DEF = {
    name: 'beep',
    description: 'Je suis la commande beep',
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
  }

export function doSomething(res) {
    return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: 'boofdsghbp',
        },
      });
}